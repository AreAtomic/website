# Base de contenu — Bilan Phase 3 Backend (Building in Public)
> Usage : brouillon de travail. À transformer en article, thread LinkedIn ou les deux.
> Date : 2026-05-12

---

## 1. Les choix qu'on a faits (et pourquoi)

### ORM : Prisma plutôt que TypeORM
Deux options sur la table. On a tranché pour Prisma.
La raison principale : `prisma db pull` — on part d'un DDL PostgreSQL déjà écrit,
Prisma génère le schema en une commande. Pas de migration manuelle à écrire.
TypeORM aurait demandé de recréer les entités à la main en décorateurs — un travail
que le DDL avait déjà fait.
Gain estimé : 2-3h de setup économisées.

### Architecture des endpoints : commandes dédiées, pas de PATCH sur le statut
Au départ le plan était CRUD classique.
Problème identifié en cours de route : un `PATCH /devis/:id { statut: "accepté" }` c'est
du CRUD qui expose n'importe quelle transition. Un devis ne peut pas passer de brouillon
à expiré sans être envoyé d'abord.
Décision : chaque transition métier irréversible devient un endpoint dédié.
- `POST /devis/:id/envoyer`
- `POST /devis/:id/accepter`
- `POST /contrats/:id/signer`
- `POST /prospects/:id/convertir`
Le PATCH générique reste pour les champs libres (notes, nom, dates).
Avantage immédiat : les règles métier sont dans le handler, pas dans un `if` perdu
dans un service générique. Avantage futur : quand on passe à du messaging (RabbitMQ),
la surface API ne change pas.

### CQRS avec @nestjs/cqrs — décision prise en milieu de développement
Ce n'était pas dans le plan initial. On a livré les premiers modules en pattern
service classique, puis on a réalisé qu'on allait dans le mur pour la préparation EDA.
Migration faite sur 7 modules d'un coup. Résultat : aucun service métier dans les
controllers — uniquement CommandBus et QueryBus. Les handlers font la mutation Prisma
et émettent un événement. Les listeners gèrent les side effects.
Coût : ~1 session de refactoring non prévue.
Bénéfice : le passage à un vrai bus de messages (RabbitMQ) ne touchera pas l'API.

### Événements in-process : @nestjs/event-emitter
Pas de RabbitMQ au MVP — trop tôt, pas de besoin mesuré.
Mais on veut que les side effects (alertes, cascades) soient isolés des commandes
métier dès maintenant.
Solution : EventEmitter2 en synchrone in-process. Les listeners créent les alertes,
jamais le handler directement.
Quand RabbitMQ arrive, on remplace `eventEmitter.emit()` par `messageBus.publish()`.
La surface API et les handlers ne changent pas.

### Pas d'enum PostgreSQL sur les statuts
La tentation : `CREATE TYPE statut_devis AS ENUM ('brouillon', 'envoyé'...)`.
Le problème : modifier un enum Postgres en production nécessite une migration bloquante.
Décision : `varchar(64)` en base + `@IsIn([...])` dans les DTOs NestJS.
Les valeurs autorisées sont centralisées dans un seul fichier `common/phase3-allowed-values.ts`.
Si on ajoute un statut, c'est un changement de code et un redeploy — pas une migration DDL.

### emitAsync vs emit — une distinction qui compte
La plupart des événements sont fire-and-forget : `emit()` synchrone, on ne attend pas
le résultat du listener.
Exception : `POST /prospects/:id/convertir`.
La réponse HTTP doit retourner la fiche client créée — et c'est le listener qui la crée.
Donc `emitAsync()` sur ce handler uniquement, pour récupérer le return du listener.
Si on avait mis `emit()` partout mécaniquement, cette route aurait retourné void.

### Statut paiement déduit, jamais stocké
Les contrats n'ont pas de colonne `paiement_statut` en base.
Le statut (non_payé / partiel / soldé / dépassé) est calculé en temps réel depuis
l'agrégat des `contract_payment_lines`.
Endpoint dédié : `GET /contrats/:id/paiement-statut`.
Avantage : jamais de désynchronisation entre le "vrai" état et le champ stocké.

### Documents : S3 repoussé en Phase 5
Le module documents livre uniquement les métadonnées (storage_key placeholder).
Le vrai upload OVH Object Storage est prévu Phase 5, en même temps que la génération PDF.
Les deux ont besoin du stockage objet — autant tout brancher en une session.

---

## 2. Temps prévu vs temps réel

| Phase | Prévu | Réel | Écart | Cause |
|-------|-------|------|-------|-------|
| Phase 0 — Docker + DDL | ~1h | ~2h | +1h | Bug encodage PowerShell (role_visé → ?) |
| Phase 1 — Bootstrap Nest + Prisma + JWT | 1 session | 1 session | = | RAS |
| Phase 2 — Auth + Freemium | 1 session | Inclus Phase 1 | -1 session | Auth moins complexe que prévu |
| Phase 3 — Blocs 1-5 (prospects→contrats) | 3-4 sessions | ~2 sessions | -1 à 2 sessions | DDL solide, spec claire |
| Refactoring CQRS (non prévu) | — | 1 session | +1 session | Décision prise en cours de route |
| Phase 3 — Blocs 6-8 (projects, docs, alerts) | 1-2 sessions | 1 session | = / -1 | Pattern CQRS déjà rodé |

**Bilan global Phase 0→3 : ~2 jours de travail effectif.**
Prévu initialement : 4-5 sessions réparties sur 1-2 semaines.
Réel : 2 jours consécutifs.

Ce qui a compressé le temps :
- Le DDL était béton. Zéro réécriture de schéma.
- La spec v2.4 avec `decisions_modele_donnees_mvp` avait déjà tranché les questions difficiles (HT/TTC, pas d'enum paiement, soft delete…).
- Les agents (Lucas backend) connaissaient le contexte et n'avaient pas à redécouvrir les décisions à chaque session.

Ce qui a allongé le temps :
- Le bug encodage PowerShell sur le DDL (1h perdue, base à réinitialiser).
- La migration CQRS non prévue (~1 session).
- La documentation backend.md avait une erreur sur le statut `signé` (détectée en code review).

---

## 3. Points d'attention pour la suite

### Phase 4 — Frontend (Sofia)
L'API est stable. Le contrat est clair. Mais Sofia va découvrir en câblant l'UI
que certains cas d'erreur ne sont pas encore normalisés : les 409 Conflict n'ont pas
tous le même format de payload. À uniformiser avant ou pendant la Phase 4.

### Tests — dette technique acceptée
Zéro test e2e ou intégration à ce stade. C'est voulu (vélocité MVP).
Mais les deux flux critiques sont à couvrir avant la mise en production :
- conversion prospect → client (emitAsync + listener + alerte)
- signature contrat → blocage delete

### Upload documents
Le `storage_key` placeholder va créer une confusion côté frontend.
Sofia aura besoin d'un champ bien nommé et d'une UX claire sur "l'upload arrive plus tard".
À préciser dans le brief Phase 4.

### Freemium — quota sur les clients, pas que les prospects
La route `POST /prospects/:id/convertir` vérifie le quota clients (FreemiumQuotaGuard sur 'clients').
C'est correct mais contre-intuitif : l'utilisateur clique "Convertir" et reçoit une erreur
403 sur les clients, alors qu'il pensait agir sur un prospect.
Le message d'erreur doit être explicite. À valider avec Sofia pour l'affichage UI.

### Mollie Phase 6 — webhook idempotence
Les webhooks Mollie peuvent arriver plusieurs fois pour le même paiement.
La table `subscription_payments` a `mollie_payment_id UNIQUE` — c'est la protection en base.
Mais le handler webhook devra explicitement gérer le cas "déjà reçu" avec un 200 silencieux
plutôt qu'un 409 bruyant (Mollie retentera si il reçoit autre chose qu'un 2xx).

---

## 4. Ce qui était bien planifié / moins bien planifié

### ✅ Bien planifié

**Le DDL.** 18 tables, zéro réécriture. Les décisions prises pendant l'atelier spec
(colonnes _ht/_ttc séparées, pas d'enum paiement, soft delete via archived_at,
unicité client×prospect_id en index partiel) se sont révélées exactes à l'implémentation.
Pas d'aller-retour schéma.

**L'ordre des modules (dépendances FK).** Le plan listait explicitement l'ordre :
prospects → clients → contacts/tasks/interactions → devis → contrats → projects → documents → alerts.
Zéro blocage sur les relations en base.

**La décision "1 user = 1 tenant".** Simplicité radicale qui évite une couche entière
de gestion multi-tenant. Le `tenant_id = users.id` traverse tout le code de façon uniforme.
Aucune exception rencontrée.

**La spec avant le code.** Avoir `gestionnaire-contrats-freelance-spec.json` avec les
`decisions_modele_donnees_mvp` figées avant d'écrire une ligne de NestJS a évité
les débats en cours de session. Les questions difficiles (enum vs varchar, statut paiement
déduit ou stocké) étaient déjà tranchées.

### ⚠️ Moins bien planifié

**L'encodage du DDL sur Windows.** PowerShell corrompt les caractères accentués
quand il pipe vers docker exec. `role_visé` est devenu `role_vis?` en base.
Résultat : base à réinitialiser, DDL à corriger (`role_vise` sans accent),
commande PowerShell spécifique à documenter. Non anticipé.

**CQRS pas dans le plan initial.** On a commencé avec des services, réalisé le problème
à mi-chemin, et refactorisé 7 modules. Ça aurait dû être la décision de départ.
La session de migration CQRS est une session "perdue" en termes de vélocité,
même si le résultat en valait la peine.

**La documentation backend.md avait une erreur.** La table des commandes indiquait
`statut → signé` pour `POST /contrats/:id/signer`. Il n'existe pas de statut `signé` en base
— la signature est portée par `signed_at`, le statut passe à `en_cours`.
Détecté en code review, corrigé. Mais si Sofia avait câblé l'UI là-dessus, ça aurait
créé un bug silencieux côté frontend.

**Le timing S3.** La question "on fait S3 maintenant ou en Phase 5 ?" a été posée trois fois
à des moments différents (lors du planning, lors de la rédaction du bloc 7, lors de la review).
Aurait dû être tranchée une fois pour toutes dans la spec. Décision finale : Phase 5.

**Pas de normalisation des erreurs dès le départ.** Les 409, 404, 403 ont des formats
de payload légèrement différents selon les modules. Cohérent dans chaque module mais pas
uniformes entre eux. C'est une dette à absorber en Phase 4 ou 7.

---

## Chiffres à retenir pour le post

- **18 tables** DDL écrites avant le premier `nest new`
- **8 modules** livrés en Phase 3
- **7 modules** migrés vers CQRS en une session
- **2 jours** de développement effectif pour les Phases 0→3
- **0 réécriture** de schéma PostgreSQL
- **1 bug** d'encodage Windows qui a coûté ~1h
- **3 fois** la question S3 reposée (auraient dû être tranchée une fois)
- **1 erreur** de doc détectée en code review (statut `signé` inexistant)
