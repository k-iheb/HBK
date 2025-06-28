-- Script SQL pour créer les tables dans Supabase
-- Exécuter ces commandes dans l'éditeur SQL de Supabase

-- Table des patients
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  adresse TEXT,
  pathologie TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des rendez-vous
CREATE TABLE rendezvous (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date_heure TIMESTAMP WITH TIME ZONE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('cabinet', 'domicile')),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_rendezvous_patient_id ON rendezvous(patient_id);
CREATE INDEX idx_rendezvous_date_heure ON rendezvous(date_heure);
CREATE INDEX idx_patients_nom_prenom ON patients(nom, prenom);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rendezvous_updated_at BEFORE UPDATE ON rendezvous
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS (Row Level Security) si nécessaire
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rendezvous ENABLE ROW LEVEL SECURITY;

-- Politiques RLS basiques (à ajuster selon vos besoins de sécurité)
CREATE POLICY "Enable all operations for authenticated users" ON patients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON rendezvous
    FOR ALL USING (auth.role() = 'authenticated');

-- Politiques pour l'accès anonyme (nécessaire pour l'application frontend)
CREATE POLICY "Enable all operations for anon users" ON patients
    FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Enable all operations for anon users" ON rendezvous
    FOR ALL USING (auth.role() = 'anon');