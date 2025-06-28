#!/usr/bin/env node

// Script de build pour remplacer les variables d'environnement
const fs = require('fs');
const path = require('path');

// Lire les variables d'environnement
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  Variables d\'environnement Supabase non définies. Utilisation des valeurs par défaut.');
}

// Créer le contenu du fichier config.js avec les vraies valeurs
const configContent = `// Configuration générée automatiquement lors du build
window.ENV = {
  SUPABASE_URL: '${SUPABASE_URL || 'https://avcorlqjyytvszdzjolt.supabase.co'}',
  SUPABASE_ANON_KEY: '${SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Y29ybHFqeXl0dnN6ZHpqb2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODE2NTMsImV4cCI6MjA2NjQ1NzY1M30.OwAOk7L_17Q572s__nDSUHRkhpu5wFr1vcg8iMb2HRU'}'
};
`;

// Écrire le fichier config.js
const configPath = path.join(__dirname, 'frontend', 'public', 'config.js');
fs.writeFileSync(configPath, configContent);

console.log('✅ Configuration Supabase générée avec succès!');