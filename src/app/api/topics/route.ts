import { NextResponse } from 'next/server';

// Static topics data for production (no database needed)
const topics = [
  { id: 'acls', name: 'ACLS', description: 'Advanced Cardiovascular Life Support' },
  { id: 'airway-management', name: 'Airway Management', description: 'Comprehensive airway management techniques' },
  { id: 'atls', name: 'ATLS', description: 'Advanced Trauma Life Support' },
  { id: 'blood-gas-analysis', name: 'Blood Gas Analysis', description: 'Arterial blood gas interpretation' },
  { id: 'bls', name: 'BLS', description: 'Basic Life Support' },
  { id: 'cardiac-emergencies', name: 'Cardiac Emergencies', description: 'Emergency cardiac conditions' },
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
  { id: 'pals', name: 'PALS', description: 'Pediatric Advanced Life Support' },
  { id: 'pediatric-emergencies', name: 'Pediatric Emergencies', description: 'Emergency pediatric care' },
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