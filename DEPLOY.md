# Déploiement — Samstyle

**Architecture**

- **DB** : TiDB Cloud (déjà déployée)
- **Backend** : Express + MySQL2 → **Render**
- **Frontend** : Vite + React → **Vercel**

Tout passe par CLI. Toutes les commandes ci-dessous se lancent dans **PowerShell** depuis `C:\stylisme`.

---

## 0. Pré-requis (une seule fois)

```powershell
# Node 20+ et npm doivent être installés. Vérifier :
node -v
npm -v

# Installer les CLI globalement
npm install -g vercel
npm install -g @render/cli   # alias: render

# Git installé et le repo poussé sur GitHub/GitLab
git --version
```

Si le repo n'est pas encore sur GitHub :

```powershell
cd C:\stylisme
git init
git add .
git commit -m "init: prêt pour déploiement Render + Vercel"
# Créer le repo sur github.com d'abord, puis :
git remote add origin https://github.com/<ton-user>/samstyle.git
git branch -M main
git push -u origin main
```

---

## 1. Backend → Render

### 1.1 Récupérer les infos TiDB Cloud

Dans la console TiDB Cloud → ton cluster → **Connect** → onglet "Standard Connection". Récupérer :

- Host (ex: `gateway01-eu-central-1.prod.aws.tidbcloud.com`)
- Port (ex: `4000`)
- User (ex: `xxxx.root`)
- Password
- Database (ex: `stylisme`)

Construire l'URL `DATABASE_URL` :

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

⚠️ Si le mot de passe contient des caractères spéciaux (`@`, `#`, `/`, `:`), les URL-encoder (`@` → `%40`, etc.).

### 1.2 Login + déploiement Render

```powershell
# Login (ouvre le navigateur)
render login

# Linker ce dossier au workspace Render
render workspace set     # sélectionner ton workspace

# Déployer via le blueprint render.yaml (à la racine)
render blueprint launch
```

Render lit le `render.yaml` à la racine, détecte le service `samstyle-api`, lance le build (`npm install && npm run build`) puis le démarrage (`npm start`). Il demandera les valeurs des env vars marquées `sync: false` :

| Variable          | Valeur                                                            |
|-------------------|-------------------------------------------------------------------|
| `DATABASE_URL`    | `mysql://USER:PASSWORD@HOST:PORT/DATABASE` (TiDB)                 |
| `ADMIN_PASSWORD`  | mot de passe admin fort (≥ 16 caractères)                         |
| `CORS_ORIGINS`    | **à remplir après l'étape 2** une fois l'URL Vercel connue        |

Le service est exposé sur `https://samstyle-api.onrender.com` (ou similaire — Render affiche l'URL à la fin du déploiement).

### 1.3 Vérification backend

```powershell
curl https://samstyle-api.onrender.com/
# Doit répondre : API fonctionne ✅
```

Si erreur DB → vérifier dans Render → Logs : c'est presque toujours une faute de frappe dans `DATABASE_URL` ou `DB_SSL` qui n'est pas à `true`.

---

## 2. Frontend → Vercel

### 2.1 Login + déploiement Vercel

```powershell
cd C:\stylisme

# Login (ouvre le navigateur)
vercel login

# Premier déploiement : Vercel pose 4-5 questions
vercel
#   Set up and deploy "C:\stylisme"? → Y
#   Which scope? → ton compte/équipe
#   Link to existing project? → N
#   What's your project's name? → samstyle (ou autre)
#   In which directory is your code located? → ./
#   Want to modify settings? → N  (Vercel détecte Vite via vercel.json)
```

Vercel détecte automatiquement Vite, lance `npm run build` et déploie en preview. Note l'URL de preview affichée (ex: `https://samstyle-xxxx.vercel.app`).

### 2.2 Ajouter l'env var VITE_API_URL

```powershell
# Définir VITE_API_URL sur les 3 environnements (production, preview, development)
vercel env add VITE_API_URL production
# Valeur à coller : https://samstyle-api.onrender.com  (URL Render de l'étape 1.2)

vercel env add VITE_API_URL preview
# Même valeur

vercel env add VITE_API_URL development
# http://localhost:5000
```

### 2.3 Déploiement production

```powershell
vercel --prod
```

Note l'URL production finale (ex: `https://samstyle.vercel.app` ou ton domaine custom).

---

## 3. Refermer la boucle CORS

Sans cette étape, le frontend Vercel ne peut **pas** appeler l'API Render (l'API rejettera la requête CORS).

```powershell
# Mettre à jour CORS_ORIGINS sur Render avec l'URL Vercel
render service env set samstyle-api CORS_ORIGINS "https://samstyle.vercel.app"

# Si tu as un domaine custom, en ajouter plusieurs séparés par des virgules :
# "https://samstyle.vercel.app,https://samstyle.com,https://www.samstyle.com"

# Forcer un redéploiement Render pour que la nouvelle env var soit prise
render deploys create samstyle-api
```

---

## 4. Vérifications finales

```powershell
# 1. Backend up
curl https://samstyle-api.onrender.com/

# 2. Frontend up
start https://samstyle.vercel.app

# 3. Tester un appel cross-origin (la page /inscription doit pouvoir POST)
#    Ouvrir la console du navigateur : aucune erreur CORS ne doit apparaître.

# 4. Tester l'admin
start https://samstyle.vercel.app/admin/login
# Login avec ADMIN_PASSWORD défini à l'étape 1.2
```

---

## 5. Déploiements suivants (workflow régulier)

Une fois le setup initial fait, chaque mise à jour suit ce flow :

```powershell
# Modifier le code, commit, push
git add .
git commit -m "feat: ajout section formation couture"
git push

# Frontend (Vercel) : auto-déploie sur chaque push si tu as connecté le repo Git
# OU déploiement manuel :
vercel --prod

# Backend (Render) : auto-déploie sur push si "Auto-Deploy" est activé
# OU déploiement manuel :
render deploys create samstyle-api
```

---

## Annexe — Variables d'environnement (récap)

### Render (backend)

| Variable          | Source                                                      |
|-------------------|-------------------------------------------------------------|
| `NODE_VERSION`    | `"20"` (déjà dans render.yaml)                              |
| `DATABASE_URL`    | TiDB Cloud — URI complète                                   |
| `DB_SSL`          | `"true"` (déjà dans render.yaml)                            |
| `ADMIN_PASSWORD`  | secret fort                                                 |
| `CORS_ORIGINS`    | URL(s) Vercel séparées par virgules                         |
| `PORT`            | défini automatiquement par Render — ne pas le surcharger    |

### Vercel (frontend)

| Variable          | Source                                                      |
|-------------------|-------------------------------------------------------------|
| `VITE_API_URL`    | URL publique de l'API Render                                |

---

## Annexe — Dépannage

**Erreur CORS dans la console Chrome**
→ `CORS_ORIGINS` n'inclut pas l'URL exacte du frontend. Vérifier le protocole (`https://`), l'absence de slash final, et redéployer Render après mise à jour.

**`Error: DB_HOST manquant dans .env` au démarrage Render**
→ Soit `DATABASE_URL` est mal renseignée, soit aucune des variables `DB_*` n'est définie. Vérifier dans Render → Environment.

**Build TypeScript échoue sur Render**
→ Vérifier `engines.node` dans `backend/package.json` (doit être `>=20.0.0`) et `NODE_VERSION=20` dans Render.

**Page blanche sur Vercel après refresh d'une route (ex: /admin/login)**
→ `vercel.json` à la racine doit contenir le rewrite vers `/index.html` (déjà en place dans ce projet).

**Vercel ne trouve pas `vite`**
→ Toujours commiter `package.json` et `package-lock.json` (ne pas les ignorer dans `.gitignore`).
