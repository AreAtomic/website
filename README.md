# Aurélien Sèbe — Site Personnel & Portfolio

Site personnel et portfolio de **Aurélien Sèbe**, développeur fullstack freelance et ancien CTO.

**🔗 [Visiter le site](https://aureliensebe.com)** | **📖 [Documentation](docs/)**

---

## 🎯 Objectif

Site vitrine personnel pour :
- Présenter l'expertise en développement fullstack, IA et produit
- Afficher les services proposés (consultation, développement, CTO freelance)
- Partager des articles et réflexions sur le web, la tech et le produit
- Capturer des leads via formulaire de contact

---

## 🚀 Quick Start

### Prérequis
- **Node.js** 18+
- **npm** ou **yarn**

### Installation & Développement

```bash
# Cloner le projet
git clone [repo-url]
cd website

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site est accessible sur **http://localhost:3000**

### Build pour production

```bash
npm run build
npm start
```

### Linter

```bash
npm run lint
```

---

## 📁 Structure du Projet

```
├── app/                          # App Router Next.js
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── blog/
│   │   ├── page.tsx             # Liste des articles
│   │   └── [slug]/page.tsx       # Article individuel
│   ├── contact/
│   │   └── page.tsx             # Formulaire de contact
│   ├── actions/
│   │   └── sendEmail.ts         # Server action pour emails
│   └── globals.css              # Styles globaux
│
├── components/                   # Composants React réutilisables
│   ├── Hero.tsx                 # Section hero (accueil)
│   ├── Services.tsx             # Services proposés
│   ├── About.tsx                # À propos
│   ├── BlogSection.tsx          # Section blog (accueil)
│   ├── ContactSection.tsx       # Call-to-action contact
│   ├── ContactForm.tsx          # Formulaire de contact
│   ├── Nav.tsx                  # Navigation
│   ├── Footer.tsx               # Pied de page
│   └── Reveal.tsx               # Animation de révélation
│
├── lib/                          # Utilitaires
│   └── posts.ts                 # Logique de chargement des articles
│
├── content/
│   └── posts/                   # Articles de blog (format MDX)
│       └── pourquoi-cadrage.mdx # Exemple d'article
│
├── public/                       # Assets statiques
│
├── next.config.mjs              # Configuration Next.js
├── tailwind.config.ts           # Configuration Tailwind CSS
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances
```

Pour plus de détails, voir **[Architecture](docs/ARCHITECTURE.md)**

---

## 🛠 Stack Technique

| Outil | Version | Rôle |
|-------|---------|------|
| **Next.js** | 14.2.0 | Framework React / SSR |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5 | Typage statique |
| **Tailwind CSS** | 3.4.0 | Styling utilitaire |
| **MDX** | 5.0.0 | Blog (Markdown + JSX) |
| **Resend** | 3.2.0 | Email API |
| **Gray Matter** | 4.0.3 | Parsing frontmatter MDX |

---

## 📝 Ajouter un Article de Blog

1. Créer un fichier `.mdx` dans `content/posts/`
2. Ajouter le frontmatter :

```mdx
---
title: "Titre de l'article"
description: "Courte description"
date: "2024-04-28"
---

# Contenu ici
```

3. Le fichier est automatiquement :
   - Listé sur `/blog`
   - Accessible via `/blog/nom-du-fichier`
   - Indexé alphabétiquement par date

Voir **[Guide Développeur](docs/GUIDE_DEVELOPPEUR.md)** pour plus de détails.

---

## 📧 Formulaire de Contact

Le formulaire envoie les emails via **[Resend](https://resend.com)** (API email moderne).

**Configuration requise :**
- Ajouter `RESEND_API_KEY` dans `.env.local`

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Voir **[Configuration](docs/GUIDE_DEVELOPPEUR.md#configuration)** pour les détails.

---

## 🎨 Design & Personnalisation

- **Tailwind CSS** avec config personnalisée pour les couleurs de marque
- **Animations fluides** avec Tailwind (transitions, révélations)
- **Responsive** mobile-first
- **Variables CSS** pour les couleurs (brand-blue, brand-ink, brand-muted)

Configuration : `tailwind.config.ts`

---

## 🚢 Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS / Google Cloud / Autres**

Voir **[Guide Déploiement](docs/DEPLOIEMENT.md)** pour les instructions.

---

## 📊 Performance

- ✅ Next.js Image Optimization
- ✅ Code splitting automatique
- ✅ Static generation (SSG) où possible
- ✅ Lazy loading des composants

---

## 🔗 Ressources Externes

- **[Resend Docs](https://resend.com/docs)** — Email API
- **[Next.js 14](https://nextjs.org/docs)** — Framework
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Styling
- **[MDX](https://mdxjs.com/)** — Markdown + React

---

## 💬 Support & Questions

Pour toute question sur le code ou la structure :
- Consultez la **[documentation technique](docs/)**
- Ouvrez une issue GitHub

---

**Dernière mise à jour :** 28 avril 2024  
**Maintenu par :** Aurélien Sèbe
