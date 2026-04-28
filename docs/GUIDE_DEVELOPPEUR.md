# Guide Développeur

Guide pratique pour développer et contribuer au site.

---

## Setup initial

### 1. Cloner le repo

```bash
git clone [repo-url]
cd website
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration `.env.local`

Créer un fichier `.env.local` à la racine du projet :

```env
# Resend API key pour envoyer des emails
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Obtenir une clé :
1. Créer compte sur [resend.com](https://resend.com)
2. Générer une API key
3. Ajouter dans `.env.local`

### 4. Démarrer le serveur dev

```bash
npm run dev
```

→ Site disponible sur `http://localhost:3000`

---

## Workflow de développement

### 1. Créer une branche

```bash
git checkout -b feature/nom-de-la-feature
```

Convention : `feature/`, `fix/`, `docs/`, `refactor/`

### 2. Faire des changements

Voir sections ci-dessous pour chaque type de changement.

### 3. Tester localement

```bash
npm run dev
# Visiter http://localhost:3000
# Tester les changements manuellement
```

### 4. Linter

```bash
npm run lint
```

Fixer les warnings :
```bash
npm run lint -- --fix
```

### 5. Commiter

```bash
git add .
git commit -m "feat: description du changement"
```

Utiliser [Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` nouvelle fonctionnalité
- `fix:` correctif bug
- `docs:` documentation
- `refactor:` refactoring sans fonctionnalité
- `style:` formatting (pas de logique)
- `perf:` optimisation de performance
- `test:` ajout/modif tests

### 6. Push et créer une PR

```bash
git push origin feature/nom-de-la-feature
```

Créer une PR sur GitHub avec description claire.

---

## Types de changements

### 🎨 Ajouter/Modifier une page

**Exemple : Ajouter une page `/about` détaillée**

1. Créer la structure de fichiers :

```bash
mkdir app/about
touch app/about/page.tsx
```

2. Implémenter la page :

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — Aurélien Sèbe',
  description: 'Mon histoire, expertise, et approche du développement.',
}

export default function AboutPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold">À propos</h1>
      {/* ... */}
    </main>
  )
}
```

3. Ajouter à la navigation :

```typescript
// components/Nav.tsx
<Link href="/about">À propos</Link>
```

4. Tester avec `npm run dev`

### 🧩 Ajouter/Modifier un composant

**Exemple : Créer un composant `Card` réutilisable**

1. Créer le fichier :

```bash
touch components/Card.tsx
```

2. Implémenter avec TypeScript :

```typescript
// components/Card.tsx
interface CardProps {
  title: string
  description: string
  href?: string
  icon?: React.ReactNode
}

export default function Card({ 
  title, 
  description, 
  href, 
  icon 
}: CardProps) {
  const className = 'rounded-lg border border-brand-muted p-6 hover:border-brand-blue transition-colors'

  const content = (
    <>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-brand-muted">{description}</p>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}
```

3. Utiliser dans d'autres composants :

```typescript
<Card 
  title="Service" 
  description="Détail du service"
  href="/services/detail"
/>
```

### 📝 Ajouter un article de blog

**Structure d'un article MDX**

```bash
touch content/posts/mon-article.mdx
```

```mdx
---
title: "Titre de l'Article"
description: "Court résumé pour la liste d'articles"
date: "2024-04-28"
---

# Titre principal

Paragraphe introductif...

## Sous-titre

Lorem ipsum dolor sit amet...

### Sous-sous-titre

- Point 1
- Point 2

[Lien externe](https://example.com)
```

**Règles**
- Fichier slug doit matcher l'URL (`mon-article.mdx` → `/blog/mon-article`)
- Date en format ISO (`YYYY-MM-DD`)
- Description max ~150 caractères
- Pas d'images actuellement (à setup)

**Preview local**
- Créer l'article dans `content/posts/`
- Visiter `/blog`
- Article apparaît automatiquement (trié par date décroissante)

### 🎨 Modifier le design

**Exemple : Changer les couleurs de marque**

1. Modifier `tailwind.config.ts` :

```typescript
theme: {
  colors: {
    'brand-blue': '#0052CC',  // Changer ici
    'brand-ink': '#1a1a1a',
    'brand-muted': '#666666',
  }
}
```

2. Utiliser dans les composants :

```typescript
<div className="bg-brand-blue text-white">...</div>
```

3. Tous les éléments avec `brand-blue` changent automatiquement

**Autres modifications design**
- Fonts : modifier `app/layout.tsx`
- Spacing/sizing : `tailwind.config.ts`
- Animations : ajouter dans `tailwind.config.ts` ou CSS

### ✉️ Modifier le formulaire contact

**Fichiers impliqués**
- `components/ContactForm.tsx` — UI formulaire
- `app/actions/sendEmail.ts` — Server Action (logique email)
- `.env.local` — API key Resend

**Ajouter un champ**

1. Ajouter à la form (`ContactForm.tsx`) :

```typescript
<input
  type="text"
  name="phone"
  placeholder="Téléphone"
  required
/>
```

2. Ajouter à la validation (`sendEmail.ts`) :

```typescript
const phone = formData.get('phone');
if (!phone || phone.toString().length < 10) {
  return { success: false, error: 'Téléphone invalide' }
}
```

3. Ajouter au contenu de l'email :

```typescript
const emailContent = `
Phone: ${phone}
// ...
`
```

### 🔧 Ajouter une dépendance

```bash
npm install package-name
```

Commiter `package.json` et `package-lock.json` :

```bash
git add package.json package-lock.json
git commit -m "deps: add package-name for feature X"
```

---

## Debugging

### Logs en développement

```typescript
// Dans une Server Action
'use server'

export async function myAction(data: FormData) {
  console.log('Données reçues :', data)
  // Logs apparaissent dans le terminal (npm run dev)
  
  return { success: true }
}
```

### DevTools du navigateur

- **Network** : requêtes API
- **Console** : erreurs/logs côté client
- **Elements** : inspection DOM
- **Performance** : mesurer rapidité

### Build preview

Avant de déployer, tester le build local :

```bash
npm run build
npm start
```

→ Teste exactement ce qui sera en prod

### Vérifier les types

```bash
npx tsc --noEmit
```

Vérifie tous les types TypeScript sans compiler.

---

## Base de code — Conventions

### Noms de fichiers
- Composants : PascalCase (`Hero.tsx`)
- Utilitaires : camelCase (`posts.ts`)
- Pages : minuscule (`page.tsx`, `layout.tsx`)

### Imports relatifs
Préférer les imports avec alias (`@/`) :

```typescript
// ✅ Bon
import Hero from '@/components/Hero'
import { getAllPosts } from '@/lib/posts'

// ❌ Mauvais
import Hero from '../../components/Hero'
```

Configuré dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Composants sans props

Si un composant n'a pas de props :

```typescript
// ✅ Bon
export default function Footer() {
  return <footer>...</footer>
}

// Au lieu de
interface FooterProps {}
export default function Footer({}: FooterProps) { ... }
```

### Types des enfants (children)

```typescript
interface Props {
  children: React.ReactNode  // ✅ Correct
  // Au lieu de
  // children: React.FC
  // children: any
}
```

### Formatage du code

Le projet n'a pas de Prettier configuré. Respecter :
- 2 espaces d'indentation
- Pas de ligne > 100 caractères (flexible)
- Pas de trailing whitespace
- Importer dans un ordre : React → libs externes → locaux

---

## Performance — Checklist

Avant de merger une PR :

- [ ] Composants lourds sont `lazy` si pertinent
- [ ] Pas d'imports inutiles (unused imports)
- [ ] Images utilisent `<Image />` de Next.js
- [ ] Pas de `console.log` en production
- [ ] States non-globaux pas synchronisés entre composants

---

## Tests (optionnel)

Actuellement pas de suite de tests. Pour ajouter :

```bash
npm install -D @testing-library/react vitest
```

Puis créer `__tests__` ou `.test.tsx` files.

---

## Déploiement

Voir [DEPLOIEMENT.md](DEPLOIEMENT.md)

---

## FAQ

### Q: Comment ajouter une variable d'environnement ?
A: Créer dans `.env.local`, puis accéder via `process.env.MA_VAR` (serveur) ou `process.env.NEXT_PUBLIC_MA_VAR` (client).

### Q: Où mettre les images ?
A: `public/images/` — accès via `/images/nom.jpg` dans `<Image />`.

### Q: Comment faire une page privée/authentifiée ?
A: Actuellement pas d'auth. À implémenter avec NextAuth.js ou Auth0 si besoin.

### Q: Pourquoi mon article de blog n'apparaît pas ?
A: Vérifier :
- [ ] Fichier est dans `content/posts/`
- [ ] Filename is kebab-case (mon-article.mdx)
- [ ] Frontmatter valide (title, description, date)
- [ ] Date format correct (YYYY-MM-DD)

### Q: Comment tester le formulaire d'email en local ?
A: Ajouter une clé API Resend dans `.env.local` et envoyer via le formulaire. Les emails sont testables avec un compte Resend sandbox.

### Q: Puis-je utiliser une autre CSS library au lieu de Tailwind ?
A: Techniquement oui, mais changera l'architecture. Consulter avant de commencer.

---

## Ressources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [Resend](https://resend.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Questions ou blocages ?** Ouvrir une issue ou PR avec détails.

**Dernière mise à jour :** 28 avril 2024
