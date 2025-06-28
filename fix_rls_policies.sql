-- Script pour corriger les politiques RLS et permettre l'accès anonyme
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Enable all operations for anon users" ON patients;
DROP POLICY IF EXISTS "Enable all operations for anon users" ON rendezvous;

-- Créer les nouvelles politiques pour l'accès anonyme
CREATE POLICY "Enable all operations for anon users" ON patients
    FOR ALL USING (auth.role() = 'anon');

CREATE POLICY "Enable all operations for anon users" ON rendezvous
    FOR ALL USING (auth.role() = 'anon');

-- Vérifier que RLS est activé
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rendezvous ENABLE ROW LEVEL SECURITY;