#!/usr/bin/env node

/**
 * Script de déploiement automatisé pour Vercel
 * Usage: node deploy.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage du déploiement...');

// Vérifier que les variables d'environnement sont configurées
function checkEnvVariables() {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Fichier .env manquant dans backend/');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (!envContent.includes('SUPABASE_URL=https://') || 
      !envContent.includes('SUPABASE_ANON_KEY=')) {
    console.error('❌ Variables Supabase manquantes dans .env');
    console.log('Configurez SUPABASE_URL et SUPABASE_ANON_KEY');
    process.exit(1);
  }
  
  console.log('✅ Variables d\'environnement vérifiées');
}

// Vérifier que Vercel CLI est installé
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    console.log('✅ Vercel CLI détecté');
  } catch (error) {
    console.log('📦 Installation de Vercel CLI...');
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      console.log('✅ Vercel CLI installé');
    } catch (installError) {
      console.error('❌ Erreur lors de l\'installation de Vercel CLI');
      process.exit(1);
    }
  }
}

// Installer les dépendances
function installDependencies() {
  console.log('📦 Installation des dépendances...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dépendances installées');
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation des dépendances');
    process.exit(1);
  }
}

// Déployer sur Vercel
function deployToVercel() {
  console.log('🚀 Déploiement sur Vercel...');
  try {
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('✅ Déploiement réussi!');
  } catch (error) {
    console.error('❌ Erreur lors du déploiement');
    process.exit(1);
  }
}

// Exécution du script
async function main() {
  try {
    checkEnvVariables();
    checkVercelCLI();
    installDependencies();
    deployToVercel();
    
    console.log('\n🎉 Déploiement terminé avec succès!');
    console.log('📱 Votre application est maintenant en ligne sur Vercel');
    console.log('🔗 Consultez le dashboard Vercel pour l\'URL de production');
    
  } catch (error) {
    console.error('❌ Erreur durant le déploiement:', error.message);
    process.exit(1);
  }
}

main();