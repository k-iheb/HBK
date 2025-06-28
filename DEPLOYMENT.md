# Guide de Déploiement sur Vercel

## Configuration des Variables d'Environnement

Pour déployer cette application sur Vercel de manière sécurisée, vous devez configurer les variables d'environnement suivantes :

### 1. Dans le Dashboard Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez les variables suivantes :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

### 2. Via Vercel CLI

Si vous utilisez Vercel CLI, vous pouvez ajouter les variables avec :

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Déploiement

### Option 1: Déploiement automatique via Git

1. Connectez votre repository GitHub/GitLab à Vercel
2. Configurez les variables d'environnement (voir ci-dessus)
3. Chaque push déclenchera un déploiement automatique

### Option 2: Déploiement manuel via CLI

```bash
# Installer Vercel CLI si ce n'est pas fait
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel --prod
```

## Sécurité

✅ **Avantages de cette configuration :**
- Les clés d'API ne sont plus exposées dans le code source
- Les variables d'environnement sont injectées de manière sécurisée lors du build
- Le fichier `config.js` est généré automatiquement avec les bonnes valeurs

⚠️ **Important :**
- Ne commitez jamais vos vraies clés d'API dans le code
- Utilisez toujours des variables d'environnement pour les données sensibles
- Le fichier `.env.example` montre quelles variables sont nécessaires

## Structure des Fichiers

```
├── build.js              # Script de build qui génère config.js
├── vercel.json           # Configuration Vercel
├── .env.example          # Exemple de variables d'environnement
└── frontend/public/
    ├── config.js         # Généré automatiquement lors du build
    ├── script.js         # Utilise window.ENV pour la configuration
    └── index.html        # Inclut config.js avant script.js
```

## Dépannage

Si l'application ne fonctionne pas après le déploiement :

1. Vérifiez que les variables d'environnement sont bien configurées dans Vercel
2. Vérifiez les logs de build dans le dashboard Vercel
3. Assurez-vous que les URLs Supabase sont correctes
4. Vérifiez que les politiques RLS sont bien configurées dans Supabase