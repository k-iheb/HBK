# 🚀 Guide de Migration Rapide - Supabase + Vercel

## ✅ Étapes à suivre (dans l'ordre)

### 1. Configuration Supabase (5 min)

1. **Créer un compte Supabase :**
   - Aller sur [supabase.com](https://supabase.com)
   - Créer un nouveau projet
   - Choisir une région proche de vos utilisateurs

2. **Créer les tables :**
   - Dans le dashboard Supabase → SQL Editor
   - Copier-coller le contenu de `supabase_setup.sql`
   - Cliquer sur "Run"

3. **Récupérer les clés :**
   - Dashboard → Settings → API
   - Copier l'URL du projet
   - Copier la clé "anon public"

### 2. Configuration locale (2 min)

1. **Mettre à jour .env :**
   ```bash
   # Dans backend/.env
   SUPABASE_URL=https://votre-projet-id.supabase.co
   SUPABASE_ANON_KEY=votre_cle_anon_ici
   PORT=3000
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

### 3. Test local (1 min)

```bash
npm run dev
```

✅ Votre app devrait fonctionner sur http://localhost:3000

### 4. Déploiement Vercel (3 min)

#### Option A - Script automatique :
```bash
npm run deploy
```

#### Option B - Manuel :
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### 5. Configuration Vercel (2 min)

1. **Dans le dashboard Vercel :**
   - Aller dans Settings → Environment Variables
   - Ajouter :
     - `SUPABASE_URL` = votre URL Supabase
     - `SUPABASE_ANON_KEY` = votre clé anon

2. **Redéployer :**
   ```bash
   vercel --prod
   ```

## 🎉 C'est terminé !

Votre application est maintenant :
- ✅ Hébergée sur Vercel
- ✅ Connectée à Supabase
- ✅ Accessible mondialement
- ✅ Avec HTTPS automatique

## 🔧 Commandes utiles

```bash
# Développement local
npm run dev

# Déploiement automatique
npm run deploy

# Voir les logs Vercel
vercel logs

# Ouvrir le dashboard Vercel
vercel
```

## ⚠️ Points importants

1. **Sécurité :** Ne jamais committer le fichier `.env`
2. **Base de données :** Les données MongoDB ne sont PAS migrées automatiquement
3. **Domaine :** Vercel fournit un domaine gratuit, vous pouvez ajouter le vôtre
4. **Limites :** Vérifiez les limites des plans gratuits Supabase/Vercel

## 🆘 Problèmes courants

### "Cannot connect to Supabase"
- Vérifiez l'URL et la clé dans .env
- Assurez-vous que les tables sont créées

### "Vercel deployment failed"
- Vérifiez que vercel.json est à la racine
- Vérifiez les variables d'environnement sur Vercel

### "CORS errors"
- Normal en développement, configurez les domaines autorisés en production

---

**Temps total estimé : 15 minutes** ⏱️