# Documentation

Bienvenue dans la documentation du site d'Aurélien Sèbe.

---

## 📚 Table des matières

### Pour commencer
- **[Architecture](ARCHITECTURE.md)** — Structure du projet, design patterns, flux de données
- **[Guide Développeur](GUIDE_DEVELOPPEUR.md)** — Setup, workflow, conventions de code
- **[Déploiement](DEPLOIEMENT.md)** — Instructions pour déployer en production

### Pour les contributions

1. **Nouvelle feature ?** → [Guide Développeur → Types de changements](GUIDE_DEVELOPPEUR.md#types-de-changements)
2. **Questions architecture ?** → [Architecture](ARCHITECTURE.md)
3. **Bug ou problème de deploy ?** → [Troubleshooting](DEPLOIEMENT.md#troubleshooting)

---

## ⚡ Quickstart

```bash
# Setup
npm install
npm run dev

# Créer un article
# → Ajouter fichier dans content/posts/

# Modifier le design
# → Éditer tailwind.config.ts

# Déployer
# → Faire une PR → Merge → Auto-déploie sur Vercel
```

---

## 🗺 Navigation par rôle

### Je veux **développer** sur le site

→ Lire [Guide Développeur](GUIDE_DEVELOPPEUR.md)
- Installatio + setup
- Workflow Git + branching
- Comment ajouter pages, composants, articles

### Je veux **comprendre l'architecture**

→ Lire [Architecture](ARCHITECTURE.md)
- Structure des dossiers
- Flux de données
- Composants clés
- Patterns courants

### Je veux **déployer le site**

→ Lire [Déploiement](DEPLOIEMENT.md)
- Sur Vercel (recommandé)
- Sur Netlify / AWS / VPS
- Checklist pré-déploiement
- Monitoring + troubleshooting

### J'ai une **question spécifique**

Consulter le **[Guide Développeur → FAQ](GUIDE_DEVELOPPEUR.md#faq)**

---

## 🔧 Stack technique

| Composant | Technologie |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | React 18 |
| Styling | Tailwind CSS 3.4 |
| Blog | MDX (Markdown + JSX) |
| Email | Resend API |
| Déploiement | Vercel (recommandé) |

---

## 📝 Fichiers clés du projet

```
├── README.md                    ← Point d'entrée principal
├── docs/                        ← Cette documentation
│   ├── README.md               ← Vous êtes ici
│   ├── ARCHITECTURE.md         ← Structure + design
│   ├── GUIDE_DEVELOPPEUR.md    ← Workflow + contribution
│   └── DEPLOIEMENT.md          ← Production + ops
│
├── app/                         ← Pages & routes
├── components/                  ← Composants React
├── lib/                        ← Logique métier
├── content/posts/              ← Articles de blog (MDX)
├── public/                     ← Assets statiques
├── tailwind.config.ts          ← Config design
├── tsconfig.json               ← Config TypeScript
└── package.json                ← Dépendances
```

---

## 🚀 Workflows courants

### Ajouter un article de blog

```bash
# 1. Créer le fichier
touch content/posts/mon-article.mdx

# 2. Ajouter le contenu (voir guide)

# 3. Tester localement
npm run dev
# → Vérifier sur http://localhost:3000/blog

# 4. Commiter et push
git add content/posts/mon-article.mdx
git commit -m "blog: add article about X"
git push
```

### Modifier le design / couleurs

```bash
# 1. Éditer tailwind.config.ts
nano tailwind.config.ts

# 2. Tester localement
npm run dev

# 3. Commiter
git commit -m "style: update brand colors"
```

### Déployer une feature

```bash
# 1. Créer une branche
git checkout -b feature/nom

# 2. Développer + tester localement
npm run dev

# 3. Linter
npm run lint

# 4. Build de prod
npm run build
npm start

# 5. Commiter
git commit -m "feat: description"

# 6. Push et créer PR
git push origin feature/nom
# → GitHub : créer PR

# 7. Merger
# → Auto-déploie sur Vercel
```

---

## 🐛 Debugging

### Composants ne s'affichent pas ?
- Vérifier les imports (`@/` alias)
- Vérifier la structure du dossier
- `npm run lint` pour les erreurs

### Articles de blog manquants ?
- Vérifier qu'ils sont dans `content/posts/`
- Vérifier le frontmatter (title, description, date)
- Redémarrer `npm run dev`

### Formulaire contact ne marche pas ?
- Vérifier `RESEND_API_KEY` dans `.env.local`
- Vérifier la clé est valide
- Regarder les logs console (navigateur + serveur)

Voir [Troubleshooting complet](DEPLOIEMENT.md#troubleshooting)

---

## ❓ FAQs rapides

**Comment ajouter une page ?**
→ Créer un dossier dans `app/` avec `page.tsx`

**Comment changer les couleurs ?**
→ Éditer `tailwind.config.ts`

**Comment ajouter une dépendance ?**
→ `npm install package-name`

**Où stocker les variables d'env ?**
→ `.env.local` (non-commité)

Plus de FAQs : [Guide Développeur → FAQ](GUIDE_DEVELOPPEUR.md#faq)

---

## 📞 Support

- **Questions techniques** → Ouvrir une issue GitHub
- **Architecture / design** → [Architecture.md](ARCHITECTURE.md)
- **Problèmes de déploiement** → [Déploiement.md](DEPLOIEMENT.md)

---

## 📖 Ressources externes

- [Next.js Docs](https://nextjs.org/docs) — Framework
- [React Docs](https://react.dev/) — UI
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [MDX](https://mdxjs.com/) — Blog format
- [Resend](https://resend.com/docs) — Email API
- [TypeScript](https://www.typescriptlang.org/docs/) — Types

---

**Dernière mise à jour :** 28 avril 2024

Vous pouvez aussi consulter le [README.md principal](../README.md)
