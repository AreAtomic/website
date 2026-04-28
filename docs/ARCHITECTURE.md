# Architecture du Projet

## Vue d'ensemble

Le site est construit avec **Next.js 14** (App Router) — un framework React moderne avec support du rendu serveur et de la génération statique.

### Principes directeurs
- **Type-safe** : TypeScript full-stack
- **Performance** : Static generation + Image optimization
- **Accessible** : Sémantique HTML + ARIA
- **Maintenable** : Composants découplés, pas de prop drilling excessif

---

## Architecture en couches

```
┌─────────────────────────────────────────┐
│         Frontend (React/TSX)            │
│  Pages, Composants, Mise en page        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Logique métier (lib/)              │
│  Chargement articles, utilitaires        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│     Données (content/posts/)            │
│  Articles MDX avec frontmatter          │
└─────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    Services externes (Resend, etc)     │
│  Email, APIs tierces                    │
└─────────────────────────────────────────┘
```

---

## Détail des répertoires

### `app/` — Routes Next.js (App Router)

Le répertoire `app/` définit les routes du site via la structure de fichiers.

```
app/
├── layout.tsx                    # RootLayout - commun à toutes les pages
├── page.tsx                      # Page d'accueil (/)
├── globals.css                   # Styles globaux
├── blog/
│   ├── page.tsx                  # /blog - Liste des articles
│   └── [slug]/
│       └── page.tsx              # /blog/[slug] - Article individuel
├── contact/
│   └── page.tsx                  # /contact - Page contact
└── actions/
    └── sendEmail.ts              # Server Action - Envoyer un email
```

#### Pages principales

**`layout.tsx`** — Layout racine
- Charge la font Inter
- Configure les métadonnées (titre, description SEO)
- Rend Nav + Footer + children

**`page.tsx`** — Accueil
- Assemble tous les composants (Hero, Services, About, etc)
- Aucune logique métier, juste orchestration

**`blog/page.tsx`** — Liste des articles
- Charge tous les articles via `getAllPosts()`
- Les affiche dans une grille

**`blog/[slug]/page.tsx`** — Article individuel
- Route dynamique basée sur le slug
- Charge et render l'article MDX
- Gère le rendu des métadonnées

**`contact/page.tsx`** — Formulaire contact
- Héberge le formulaire
- Appelle la Server Action `sendEmail` à la soumission

#### Server Actions

**`actions/sendEmail.ts`**
- Fonction `'use server'` — exécutée côté serveur
- Valide les données du formulaire
- Appelle l'API Resend pour envoyer l'email
- Retourne status de succès/erreur au client

---

### `components/` — Composants React réutilisables

Tous les composants sont des **functional components** TypeScript.

```
components/
├── Nav.tsx                      # Navigation header
├── Footer.tsx                   # Pied de page
├── Hero.tsx                     # Section hero (landing)
├── Services.tsx                 # Services proposés
├── About.tsx                    # À propos / expertise
├── ContactSection.tsx           # CTA contact (section accueil)
├── ContactForm.tsx              # Formulaire contact (réutilisable)
├── BlogSection.tsx              # Aperçu blog (accueil)
└── Reveal.tsx                   # HOC pour animations de révélation
```

#### Composants clés

**`Hero.tsx`**
- Large section "au-dessus de la pliure"
- Titre accrocheur + CTA
- Design minimaliste, typography grande

**`Services.tsx`**
- 3-4 services principaux
- Icônes + descriptions courtes
- Liens vers détails

**`ContactForm.tsx`**
- Form HTML réutilisable
- Validation client + serveur
- États loading/success/error

**`BlogSection.tsx`**
- Affiche les derniers articles
- Utilise `getAllPosts()` de `lib/posts`
- Links vers `/blog/[slug]`

**`Reveal.tsx`**
- HOC (Higher-Order Component)
- Animation "slide-up" on scroll via Intersection Observer
- Ajoute du "Polish" au design

---

### `lib/` — Logique métier

```
lib/
└── posts.ts
```

**`posts.ts`** — Chargement et parsing des articles

```typescript
// Types
interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
}

// Fonction principale
export function getAllPosts(): Post[] {
  // 1. Lit content/posts/*.mdx
  // 2. Parse frontmatter avec gray-matter
  // 3. Extrait slug du nom fichier
  // 4. Trie par date (décroissant)
  // 5. Retourne array de Post
}
```

### `content/posts/` — Articles de blog (MDX)

Chaque fichier `.mdx` est un article.

**Format**

```mdx
---
title: "Titre"
description: "Courte description"
date: "2024-04-28"
---

# Contenu Markdown/JSX ici

Vous pouvez utiliser **Markdown** et <Component /> JSX.
```

**Frontmatter requis**
- `title` : titre affiché
- `description` : résumé pour listes
- `date` : ISO 8601 format, pour tri et affichage

---

### `public/` — Assets statiques

Images, favicons, fonts, etc.

Servis directement via `/` dans les URLs.

---

## Flux de données — Exemple : Affichage d'un article

```
1. Utilisateur visite /blog/pourquoi-cadrage

2. Next.js route vers blog/[slug]/page.tsx
   slug = "pourquoi-cadrage"

3. Page charge :
   - getAllPosts() depuis lib/posts.ts
   - Trouve le post avec slug matching
   - Charge le fichier .mdx

4. MDX compilé → React component

5. Page rend le composant article
   avec layout + métadonnées

6. HTML statique généré (à build time)

7. Navigateur affiche
```

## Flux de données — Exemple : Envoi d'email

```
1. Utilisateur remplit formulaire contact
   et clique "Envoyer"

2. ContactForm appelle:
   sendEmail(formData)

3. Server Action (app/actions/sendEmail.ts):
   - Valide les données côté serveur
   - Appelle API Resend
   - Retourne {success, error}

4. Component met à jour l'UI
   (message de succès ou erreur)
```

---

## Styling — Tailwind CSS

### Configuration personnalisée

`tailwind.config.ts` définit :

```typescript
theme: {
  colors: {
    'brand-blue': '#0052CC',
    'brand-ink': '#1a1a1a',
    'brand-muted': '#666666',
    // ...
  }
}
```

Ces couleurs sont utilisées partout pour cohérence.

### Conventions

- **Tailwind first** — préférer les classes utilitaires
- **Pas de CSS-in-JS** — utiliser `className=""` avec Tailwind
- **Responsive** — utiliser `md:`, `lg:` prefixes
- **Dark mode** — pas encore implémenté (à faire)

---

## Performance — Optimisations

### Static Generation (SSG)

- Pages `/`, `/blog`, `/contact` sont **pré-générées** au build
- Rechargées à chaque rebuild
- Pas de requêtes dynamiques à runtime

### Dynamic Routes

- `/blog/[slug]` — articles pré-générés pour chaque slug au build
- Régeneration à demand (ISR) — pas configurée

### Images

- Next.js `<Image />` — optimisation automatique
- Lazy loading par défaut

### Code Splitting

- Next.js split automatiquement par route
- Composants lourds → lazy loading si besoin

---

## TypeScript — Types clés

```typescript
// Post type (lib/posts.ts)
interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
}

// React.FC<Props> pour tous les composants
interface HeroProps {
  // ...
}

export default function Hero({...}: HeroProps) {
  // ...
}
```

---

## Variables d'environnement

Définis dans `.env.local` (non commités) :

```env
# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optionnel
NEXT_PUBLIC_SITE_URL=https://aureliensebe.com
```

`NEXT_PUBLIC_*` — accessibles au navigateur
Autres — serveur uniquement

---

## Dépendances principales

| Package | Usage |
|---------|-------|
| `next@14.2.0` | Framework, routing, SSR |
| `react@18.3.1` | Library UI |
| `typescript@5` | Typage |
| `tailwindcss@3.4.0` | Styling |
| `next-mdx-remote@5.0.0` | Render MDX côté serveur |
| `gray-matter@4.0.3` | Parse frontmatter YAML |
| `resend@3.2.0` | Email API |

---

## Patterns courants

### Composant réutilisable
```tsx
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props) {
  return <div>{title}{children}</div>;
}
```

### Page dynamique
```tsx
// app/blog/[slug]/page.tsx
export default async function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return <article>{post.content}</article>;
}
```

### Server Action
```tsx
'use server'

export async function sendEmail(data: FormData) {
  const email = data.get('email');
  // ...
  return { success: true };
}
```

---

## Checklists pour contributions

### Ajouter une page
- [ ] Créer dossier dans `app/`
- [ ] Ajouter `page.tsx`
- [ ] Ajouter route à `Nav.tsx`
- [ ] Ajouter métadonnées
- [ ] Tester responsive

### Ajouter un composant
- [ ] Créer fichier dans `components/`
- [ ] Typer les props
- [ ] Utiliser Tailwind
- [ ] Respecter design tokens (couleurs)
- [ ] Documenter si complexe

### Ajouter un article
- [ ] Créer `content/posts/nom-slug.mdx`
- [ ] Ajouter frontmatter complet
- [ ] Écrire contenu
- [ ] Tester preview localement

---

**Prochaine lecture :** [Guide Développeur](GUIDE_DEVELOPPEUR.md)
