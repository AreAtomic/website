# Guide Déploiement

Instructions pour déployer le site en production.

---

## Vue d'ensemble

Le site peut être déployé sur plusieurs plateformes. **Vercel** est recommandée car :
- Créée par les auteurs de Next.js
- Déploiement 1-click depuis GitHub
- Free tier généreux
- Gestion auto des variables d'env

Alternatives : Netlify, AWS, Google Cloud, etc.

---

## Déploiement sur Vercel (recommandé)

### Prérequis
- Repo GitHub
- Compte Vercel (gratuit)

### Étapes

#### 1. Créer un compte Vercel

Aller sur [vercel.com](https://vercel.com) et créer un compte (GitHub login recommandé).

#### 2. Connecter le repo

1. Dashboard Vercel → "Add New Project"
2. Sélectionner le repo GitHub
3. Cliquer "Import"

#### 3. Configurer les variables d'environnement

1. Dans la page d'import, aller à "Environment Variables"
2. Ajouter les variables :

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

3. Cliquer "Deploy"

#### 4. Première déploiement

Vercel construit automatiquement et déploie. Vous recevrez une URL publique.

**URL par défaut :** `https://website-xxxxx.vercel.app`

#### 5. Domain personnalisé

1. Dashboard → Project → Settings → Domains
2. Ajouter votre domaine (`aureliensebe.com`)
3. Suivre les instructions pour DNS

### Redéployer

Chaque push sur `main` (ou branche configurée) redéploie automatiquement.

Pour redéployer manuellement :
- Dashboard → Deployments → "Redeploy" sur le dernier déploiement

### Vérification post-déploiement

- [ ] URL fonctionne
- [ ] Formulaire contact envoie les emails
- [ ] Blog articles affichent correctement
- [ ] Images chargent
- [ ] Pas d'erreurs 404

---

## Déploiement sur Netlify

Alternatif à Vercel.

### Étapes

#### 1. Créer un compte Netlify

[netlify.com](https://netlify.com) → Login avec GitHub

#### 2. Créer un site

1. "Add new site" → "Import an existing project"
2. Sélectionner repo GitHub
3. Configurer :
   - Build command: `npm run build`
   - Publish directory: `.next` (ou `./.next`)
   - Node version: 18+

#### 3. Variables d'environnement

Site settings → Build & deploy → Environment
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### 4. Déployer

Cliquer "Deploy site"

**Note :** Netlify nécessite une configuration spéciale pour Next.js (Runtime functions). Préférer Vercel pour Next.js.

---

## Déploiement manuel (VPS / serveur propre)

Déployer sur un serveur Linux personnel.

### Prérequis
- VPS (AWS, DigitalOcean, Linode, etc.)
- SSH access
- Node.js 18+ installé
- PM2 ou similaire pour gérer le processus

### Étapes

#### 1. Préparer le serveur

```bash
# Installer Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer Git
sudo apt-get install git

# Installer PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Cloner le repo

```bash
git clone [repo-url] ~/website
cd ~/website
```

#### 3. Installer et builder

```bash
npm install
npm run build
```

#### 4. Configurer variables d'env

```bash
nano .env.local
# Ajouter
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### 5. Démarrer avec PM2

```bash
pm2 start npm --name "website" -- start

# Pour auto-restart au reboot
pm2 startup
pm2 save
```

Vérifier :
```bash
pm2 list
```

#### 6. Configurer Nginx (optionnel, pour proxy reverse)

```nginx
server {
    listen 80;
    server_name aureliensebe.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Redémarrer Nginx :
```bash
sudo systemctl restart nginx
```

#### 7. SSL/HTTPS (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d aureliensebe.com
```

### Mises à jour

Pour mettre à jour le code :

```bash
cd ~/website
git pull
npm install
npm run build
pm2 restart website
```

---

## Déploiement sur AWS

Utiliser AWS Amplify ou EC2.

### AWS Amplify (simple)

1. [Amplify Console](https://console.aws.amazon.com/amplify)
2. "New app" → "Deploy an app"
3. Connecter GitHub repo
4. Configurer :
   - Build settings (auto-détecté pour Next.js)
   - Env variables
5. Déployer

### AWS EC2 (contrôle total)

Similaire au déploiement VPS. Utiliser une instance Ubuntu, puis suivre les étapes VPS.

---

## Déploiement sur Google Cloud

### Google Cloud Run

Pour des déploiements serverless :

1. [Cloud Console](https://console.cloud.google.com/)
2. Cloud Run → "Create service"
3. Build depuis GitHub ou Docker image
4. Configurer variables d'env
5. Déployer

Nécessite un `Dockerfile` (à créer si non-existant).

---

## Checklist pré-déploiement

Avant chaque déploiement en production :

- [ ] Pas de `console.log` de debug
- [ ] `.env.local` **NOT** commité (dans `.gitignore`)
- [ ] Linter passe (`npm run lint`)
- [ ] Build réussit localement (`npm run build`)
- [ ] Test en mode production : `npm start`
- [ ] Pas de dépendances avec dev versions
- [ ] SEO métadonnées correctes
- [ ] Images optimisées
- [ ] Liens externes valides

---

## Monitoring post-déploiement

### Sur Vercel

- Dashboard → Deployments → dernière déploiement
- Voir logs, build time, analytics
- Uptime monitoring intégré

### Monitoring personnalisé

Ajouter une solution de monitoring :

**Sentry** (error tracking)
```bash
npm install @sentry/nextjs
```

**Axiom** (logs + analytics)
- Ajouter webhook HTTP pour logs

**LogRocket** (replay de session)

**Umami** (analytics privée)

---

## Rollback (revenir à une version antérieure)

### Sur Vercel

1. Dashboard → Deployments
2. Chercher le déploiement antérieur à revenir
3. Cliquer "Promote to Production"

### Git-based rollback

```bash
git revert <commit-hash>
git push origin main
# Redéployer (auto ou manuel selon plateforme)
```

---

## Performance en production

### Vérification

**Lighthouse (dans Chrome DevTools)**
1. Ouvrir DevTools (F12)
2. Onglet "Lighthouse"
3. "Generate report"

Objectifs :
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

**PageSpeed Insights**
- https://pagespeed.web.dev

### Optimisation

Si performance faible :

1. Utiliser `<Image />` Next.js au lieu de `<img />`
2. Lazy-load les composants lourds
3. Réduire les dépendances
4. Activer gzip/brotli sur serveur
5. Cache stratégique avec CDN

---

## Logs et debugging en production

### Sur Vercel

```
Dashboard → Deployments → (sélectionner déploiement) → Logs
```

### Via SSH (VPS)

```bash
# Logs PM2
pm2 logs website

# Logs système
sudo journalctl -u nginx -f

# Application logs
tail -f /var/log/application.log
```

### Erreurs d'email (Resend)

[Dashboard Resend](https://app.resend.com) → "Activity" → voir les erreurs d'envoi

---

## Domaine personnalisé

### Pointer un domaine vers votre site

**DNS Provider** (GoDaddy, Namecheap, OVH, etc.)

Pour Vercel :
1. Ajouter domaine dans Vercel settings
2. Copier les nameservers de Vercel
3. Aller chez votre DNS provider
4. Mettre à jour les nameservers (peut prendre 24h)

Pour serveur personnel (self-hosted) :
- Ajouter record A : `your-domain.com → your-server-ip`
- Ajouter CNAME si www : `www.your-domain.com → your-domain.com`

---

## Email en production (Resend)

### Configuration

1. Vérifier le domaine auprès de Resend :
   - [Resend Dashboard](https://app.resend.com) → Domains
   - Ajouter domaine
   - Vérifier DNS records (SPF, DKIM, DMARC)

2. Tester les emails reçus (pas de rate limit)

### Capacités

- Free tier : 100 emails/jour
- Plan payant : usage-based
- Webhook support : pour tracking

---

## Scaling (si traffic augmente)

### Indicateurs de besoin

- > 10k visitors/mois
- > 100 concurrent users
- Lenteurs observées

### Solutions

**Vercel** → Auto-scaling, pas d'action nécessaire

**VPS propre** → Ajouter :
- Load balancer (Nginx)
- CDN (Cloudflare)
- Database cache (Redis) si besoin

**Serverless (Cloud Run, Lambda)** → Scale automatiquement

---

## Sécurité

- [ ] HTTPS activé (SSL/TLS)
- [ ] Headers de sécurité (CSP, X-Frame-Options, etc.)
- [ ] Valider les inputs (formulaire)
- [ ] Rôle API keys (.env.local, jamais commité)
- [ ] Rate limiting sur formulaire contact

### Headers de sécurité (Next.js)

Dans `next.config.mjs` :

```javascript
export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
}
```

---

## Troubleshooting

### Build échoue avec "Module not found"

```bash
npm install
npm run build
```

Vérifier les imports (chemin correct) et dépendances.

### Email ne s'envoie pas

- [ ] `RESEND_API_KEY` configurée ?
- [ ] Domaine vérifié chez Resend ?
- [ ] Rate limit atteint ?
- [ ] Check Resend activity log

### Site lent en production

- Runlighthouse test
- Vérifier les images (compression)
- Vérifier la région du serveur
- Activer cache

---

## Ressources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Resend Email API](https://resend.com/docs)
- [Nginx Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

---

**Questions sur le déploiement ?** Ouvrir une issue.

**Dernière mise à jour :** 28 avril 2024
