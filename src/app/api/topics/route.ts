import { NextResponse } from 'next/server';

// Static topics data for production (no database needed)
const topics = [
  { id: 'acls', name: 'ACLS', description: 'Advanced Cardiovascular Life Support' },
  { id: 'advanced-ecg-interpretation', name: 'Advanced ECG Interpretation', description: 'Complex ECG patterns with visual descriptions and clinical scenarios' },
  { id: 'adult-oncologic-emergencies', name: 'Adult Oncologic Emergencies', description: 'Adult cancer-related emergency conditions' },
  { id: 'airway-management', name: 'Airway Management', description: 'Comprehensive airway management techniques' },
  { id: 'atls', name: 'ATLS', description: 'Advanced Trauma Life Support' },
  { id: 'blood-gas-analysis', name: 'Blood Gas Analysis', description: 'Arterial blood gas interpretation' },
  { id: 'bls', name: 'BLS', description: 'Basic Life Support' },
  { id: 'cardiac-emergencies', name: 'Cardiac Emergencies', description: 'Emergency cardiac conditions' },
  { id: 'chest-xray-interpretation', name: 'Chest X-ray Interpretation', description: 'Systematic chest radiograph analysis with clinical correlation' },
  { id: 'critical-care-emergencies', name: 'Critical Care Emergencies', description: 'ICU emergency management' },
  { id: 'ecg-emergencies', name: 'ECG Emergencies', description: 'Emergency ECG interpretation' },
  { id: 'ecg-rhythm-identification', name: 'ECG Rhythm Identification', description: 'ECG rhythm strip analysis' },
  { id: 'electrolyte-emergencies', name: 'Electrolyte Emergencies', description: 'Electrolyte imbalance management' },
  { id: 'endocrine-emergencies', name: 'Endocrine Emergencies', description: 'Emergency endocrine conditions' },
  { id: 'environmental-emergencies', name: 'Environmental Emergencies', description: 'Heat, cold, and environmental injuries' },
  { id: 'geriatric-emergencies', name: 'Geriatric Emergencies', description: 'Emergency care for elderly patients' },
  { id: 'hematologic-emergencies', name: 'Hematologic Emergencies', description: 'Blood and coagulation emergencies' },
  { id: 'infectious-disease-emergencies', name: 'Infectious Disease Emergencies', description: 'Emergency infectious diseases' },
  { id: 'mechanical-ventilation', name: 'Mechanical Ventilation', description: 'Ventilator management' },
  { id: 'neurological-emergencies', name: 'Neurological Emergencies', description: 'Emergency neurological conditions' },
  { id: 'obstetric-gynecologic-emergencies', name: 'OB/GYN Emergencies', description: 'Obstetric and gynecologic emergencies' },
  
  // NEW: Oncologic Emergency Tiers
  { id: 'oncologic-tier-1', name: '🏥 Oncologic Tier 1: Foundation', description: 'Basic oncologic emergency recognition (30 questions, 45 min)' },
  { id: 'oncologic-tier-2', name: '🏥 Oncologic Tier 2: Core Emergency', description: 'Common emergencies with standard protocols (30 questions, 50 min)' },
  { id: 'oncologic-tier-3', name: '🏥 Oncologic Tier 3: Advanced Management', description: 'Complex scenarios requiring advanced decisions (30 questions, 55 min)' },
  { id: 'oncologic-tier-4', name: '🏥 Oncologic Tier 4: Critical Care', description: 'ICU-level emergencies and complications (30 questions, 60 min)' },
  { id: 'oncologic-tier-5', name: '🏥 Oncologic Tier 5: Specialist', description: 'Rare emergencies requiring specialist knowledge (30 questions, 65 min)' },
  { id: 'oncologic-tier-6', name: '🏥 Oncologic Tier 6: Consultant', description: 'Multi-system emergencies requiring consultant expertise (30 questions, 70 min)' },
  { id: 'oncologic-tier-7', name: '🏥 Oncologic Tier 7: Master Clinician', description: 'Most challenging scenarios requiring mastery (30 questions, 75 min)' },
  
  { id: 'pals', name: 'PALS', description: 'Pediatric Advanced Life Support' },
  { id: 'pediatric-emergencies', name: 'Pediatric Emergencies', description: 'Emergency pediatric care' },
  { id: 'pediatric-oncologic-emergencies', name: 'Pediatric Oncologic Emergencies', description: 'Pediatric cancer-related emergency conditions' },
  { id: 'pharmacology-emergencies', name: 'Pharmacology Emergencies', description: 'Emergency medications and toxicology' },
  { id: 'point-of-care-ultrasound', name: 'Point-of-Care Ultrasound', description: 'POCUS, Echocardiography, and eFAST' },
  { id: 'procedures', name: 'Procedures', description: 'Emergency medical procedures' },
  { id: 'psychiatric-emergencies', name: 'Psychiatric Emergencies', description: 'Mental health emergencies' },
  { id: 'renal-emergencies', name: 'Renal Emergencies', description: 'Kidney and urological emergencies' },
  { id: 'respiratory-emergencies', name: 'Respiratory Emergencies', description: 'Emergency respiratory conditions' },
  { id: 'sepsis-management', name: 'Sepsis Management', description: 'Sepsis and septic shock management' },
  { id: 'toxicology', name: 'Toxicology', description: 'Poisoning and overdose management' },
  { id: 'trauma-management', name: 'Trauma Management', description: 'Emergency trauma care' }
];

export async function GET() {
  try {
    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}