import { NextResponse } from 'next/server';

export async function GET() {
  const topics = [
    { value: 'bls', label: 'Basic Life Support (BLS)' },
    { value: 'acls', label: 'Advanced Cardiovascular Life Support (ACLS)' },
    { value: 'atls', label: 'Advanced Trauma Life Support (ATLS)' },
    { value: 'airway-management', label: 'Airway Management' },
    { value: 'blood-gas-analysis', label: 'Blood Gas Analysis' },
    { value: 'chest-xray-interpretation', label: 'Chest X-ray Interpretation' },
    { value: 'cardiac-emergencies', label: 'Cardiac Emergencies' },
    { value: 'ecg-emergencies', label: 'ECG Emergencies' },
    { value: 'ecg-rhythm-identification', label: 'ECG Rhythm Identification' },
    { value: 'advanced-ecg-interpretation', label: 'Advanced ECG Interpretation' },
    { value: 'critical-care-emergencies', label: 'Critical Care Emergencies' },
    { value: 'electrolyte-emergencies', label: 'Electrolyte Emergencies' },
    { value: 'endocrine-emergencies', label: 'Endocrine Emergencies' },
    { value: 'environmental-emergencies', label: 'Environmental Emergencies' },
    { value: 'geriatric-emergencies', label: 'Geriatric Emergencies' },
    { value: 'hematologic-emergencies', label: 'Hematologic Emergencies' },
    { value: 'infectious-disease-emergencies', label: 'Infectious Disease Emergencies' },
    { value: 'mechanical-ventilation', label: 'Mechanical Ventilation' },
    { value: 'neurological-emergencies', label: 'Neurological Emergencies' },
    { value: 'obstetric-gynecologic-emergencies', label: 'OB/GYN Emergencies' },
    { value: 'pals', label: 'Pediatric Advanced Life Support (PALS)' },
    { value: 'pediatric-emergencies', label: 'Pediatric Emergencies' },
    { value: 'pharmacology-emergencies', label: 'Pharmacology Emergencies' },
    { value: 'point-of-care-ultrasound', label: 'Point-of-Care Ultrasound' },
    { value: 'procedures', label: 'Procedures' },
    { value: 'psychiatric-emergencies', label: 'Psychiatric Emergencies' },
    { value: 'renal-emergencies', label: 'Renal Emergencies' },
    { value: 'respiratory-emergencies', label: 'Respiratory Emergencies' },
    { value: 'sepsis-management', label: 'Sepsis Management' },
    { value: 'toxicology', label: 'Toxicology' },
    { value: 'trauma-management', label: 'Trauma Management' },
    { value: 'adult-oncology-batch-1', label: 'Adult Oncologic Emergencies - Batch 1' },
    { value: 'pediatric-oncology-batch-1', label: 'Pediatric Oncologic Emergencies - Batch 1' }
  ];

  return NextResponse.json(topics);
}