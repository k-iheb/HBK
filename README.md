# Application Kiné - Migration Supabase + Vercel

## 🚀 Migration vers Supabase et Vercel

Ce projet a été migré de MongoDB vers Supabase pour la base de données et configuré pour le déploiement sur Vercel.

## 📋 Étapes de migration

### 1. Configuration Supabase

1. **Créer un projet Supabase :**
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un nouveau projet
   - Notez l'URL du projet et la clé anonyme

2. **Créer les tables :**
   - Ouvrez l'éditeur SQL dans votre dashboard Supabase
   - Exécutez le contenu du fichier `supabase_setup.sql`

3. **Configurer les variables d'environnement :**
   ```bash
   # Dans backend/.env
   SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
   PORT=3000
   ```

### 2. Installation des dépendances

```bash
# Installer les nouvelles dépendances
npm install

# Ou si vous préférez yarn
yarn install
```

### 3. Test en local

```bash
# Démarrer le serveur de développement
npm run dev

# Ou
yarn dev
```

### 4. Déploiement sur Vercel

1. **Préparer le projet :**
   - Assurez-vous que tous les fichiers sont commités dans Git
   - Le fichier `vercel.json` est déjà configuré

2. **Déployer sur Vercel :**
   ```bash
   # Installer Vercel CLI
   npm i -g vercel
   
   # Se connecter à Vercel
   vercel login
   
   # Déployer le projet
   vercel
   ```

3. **Configurer les variables d'environnement sur Vercel :**
   - Dans le dashboard Vercel, allez dans Settings > Environment Variables
   - Ajoutez :
     - `SUPABASE_URL` : votre URL Supabase
     - `SUPABASE_ANON_KEY` : votre clé anonyme Supabase

## 🔧 Changements techniques

### Supprimé :
- MongoDB/Mongoose
- Fichier `config/db.js`
- Modèles Mongoose (`models/Patient.js`, `models/Rendezvous.js`)

### Ajouté :
- Client Supabase (`@supabase/supabase-js`)
- Configuration Vercel (`vercel.json`)
- Script SQL pour créer les tables (`supabase_setup.sql`)

### Modifié :
- Contrôleurs pour utiliser Supabase au lieu de Mongoose
- Serveur principal (`server.js`)
- Variables d'environnement (`.env`)

## 📊 Structure de la base de données

### Table `patients`
- `id` (UUID, clé primaire)
- `nom` (VARCHAR, requis)
- `prenom` (VARCHAR, requis)
- `telephone` (VARCHAR, optionnel)
- `adresse` (TEXT, optionnel)
- `pathologie` (TEXT, optionnel)
- `notes` (TEXT, optionnel)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Table `rendezvous`
- `id` (UUID, clé primaire)
- `date_heure` (TIMESTAMP, requis)
- `type` (VARCHAR, 'cabinet' ou 'domicile')
- `patient_id` (UUID, clé étrangère vers patients)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔒 Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Politiques configurées pour les utilisateurs authentifiés
- Variables d'environnement sécurisées

## 📝 Notes importantes

1. **Données existantes :** Si vous avez des données dans MongoDB, vous devrez les migrer manuellement vers Supabase
2. **Authentification :** Le projet utilise actuellement l'accès anonyme. Pour la production, considérez l'ajout d'une authentification
3. **CORS :** Configuré pour accepter toutes les origines en développement

## 🆘 Dépannage

### Erreur de connexion Supabase
- Vérifiez que l'URL et la clé sont correctes
- Assurez-vous que les tables sont créées
- Vérifiez les politiques RLS

### Erreur de déploiement Vercel
- Vérifiez que `vercel.json` est à la racine
- Assurez-vous que les variables d'environnement sont configurées
- Vérifiez les logs de déploiement

## 📞 Support

Pour toute question ou problème, consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)