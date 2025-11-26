import { NextResponse } from 'next/server';

export async function GET() {
  const topics = [
    { id: 'bls', name: 'Basic Life Support (BLS)', description: 'Essential life-saving techniques for cardiac arrest and respiratory emergencies' },
    { id: 'acls', name: 'Advanced Cardiovascular Life Support (ACLS)', description: 'Advanced algorithms for cardiac arrest and cardiovascular emergencies' },
    { id: 'atls', name: 'Advanced Trauma Life Support (ATLS)', description: 'Systematic approach to trauma patient assessment and management' },
    { id: 'airway-management', name: 'Airway Management', description: 'Techniques for securing and maintaining patient airways in emergency situations' },
    { id: 'blood-gas-analysis', name: 'Blood Gas Analysis', description: 'Interpretation of arterial blood gases and acid-base disorders' },
    { id: 'chest-xray-interpretation', name: 'Chest X-ray Interpretation', description: 'Systematic approach to reading and interpreting chest radiographs' },
    { id: 'cardiac-emergencies', name: 'Cardiac Emergencies', description: 'Management of acute cardiac conditions and arrhythmias' },
    { id: 'ecg-emergencies', name: 'ECG Emergencies', description: 'Recognition and management of life-threatening ECG findings' },
    { id: 'ecg-rhythm-identification', name: 'ECG Rhythm Identification', description: 'Systematic approach to identifying cardiac rhythms and arrhythmias' },
    { id: 'advanced-ecg-interpretation', name: 'Advanced ECG Interpretation', description: 'Complex ECG analysis including ST elevation, conduction blocks, and intervals' },
    { id: 'critical-care-emergencies', name: 'Critical Care Emergencies', description: 'Management of critically ill patients requiring intensive care' },
    { id: 'electrolyte-emergencies', name: 'Electrolyte Emergencies', description: 'Recognition and treatment of dangerous electrolyte imbalances' },
    { id: 'endocrine-emergencies', name: 'Endocrine Emergencies', description: 'Management of diabetic ketoacidosis, thyroid storm, and adrenal crisis' },
    { id: 'environmental-emergencies', name: 'Environmental Emergencies', description: 'Treatment of heat stroke, hypothermia, and environmental exposures' },
    { id: 'geriatric-emergencies', name: 'Geriatric Emergencies', description: 'Special considerations for emergency care in elderly patients' },
    { id: 'hematologic-emergencies', name: 'Hematologic Emergencies', description: 'Management of bleeding disorders and hematologic crises' },
    { id: 'infectious-disease-emergencies', name: 'Infectious Disease Emergencies', description: 'Recognition and treatment of serious infections and sepsis' },
    { id: 'mechanical-ventilation', name: 'Mechanical Ventilation', description: 'Principles and management of mechanical ventilation in critical care' },
    { id: 'neurological-emergencies', name: 'Neurological Emergencies', description: 'Management of stroke, seizures, and altered mental status' },
    // Detailed OB/GYN Topics
    { id: 'placenta-previa', name: 'Placenta Previa', description: 'Diagnosis and management of placental implantation over the cervical os' },
    { id: 'placental-abruption', name: 'Placental Abruption', description: 'Recognition and management of premature placental separation' },
    { id: 'preeclampsia', name: 'Preeclampsia & Eclampsia', description: 'Hypertensive disorders of pregnancy including HELLP syndrome' },
    { id: 'preterm-labour', name: 'Preterm Labour & PPROM', description: 'Management of preterm labor and preterm premature rupture of membranes' },
    { id: 'obstetric-emergencies', name: 'Obstetric Emergencies', description: 'Acute complications: cord prolapse, shoulder dystocia, PPH, uterine inversion' },
    { id: 'gyn-pain-bleeding', name: 'Gynecologic Pain & Bleeding', description: 'Postmenopausal bleeding, endometrial cancer, ovarian torsion, PID' },
    { id: 'vasa-previa-rupture', name: 'Vasa Previa & Uterine Rupture', description: 'Rare but critical obstetric complications requiring emergency intervention' },
    { id: 'general-obgyn-emergencies', name: 'General OB/GYN Emergencies', description: 'Broad spectrum: ectopic pregnancy, ovarian torsion, hyperemesis, trauma in pregnancy' },
    // Medical Comorbidities in Pregnancy (2024-2025 Guidelines)
    { id: 'cardiac-disease-pregnancy', name: 'Cardiac Disease in Pregnancy', description: 'Valvular disease, congenital heart disease, PPCM, anticoagulation management per ESC 2023/2024 and ACC/AHA 2024 guidelines' },
    { id: 'diabetes-pregnancy', name: 'Diabetes in Pregnancy', description: 'GDM screening and management, pregestational diabetes optimization per ADA 2025 Standards of Care' },
    { id: 'hypertensive-disorders-pregnancy', name: 'Hypertensive Disorders in Pregnancy', description: 'Chronic hypertension management including CHAP trial 2022 data and evidence-based BP targets per AHA/ACC 2024' },
    { id: 'thromboembolism-pregnancy', name: 'Thromboembolism in Pregnancy', description: 'VTE prevention and treatment, antiphospholipid syndrome per revised Sydney 2023 criteria, neuraxial timing per ASRA 2024' },
    { id: 'infectious-disease-pregnancy', name: 'Infectious Disease in Pregnancy', description: 'HIV (U=U concept), hepatitis B/C, HSV, GBS, TORCH infections, COVID-19, vaccination per CDC/NIH 2024 guidelines' },
    { id: 'renal-disease-pregnancy', name: 'Renal Disease in Pregnancy', description: 'CKD staging and outcomes, dialysis intensification strategies, renal transplant management per KDIGO 2024 guidelines' },
    { id: 'thyroid-disorders-pregnancy', name: 'Thyroid Disorders in Pregnancy', description: 'Hypothyroidism and hyperthyroidism management, ATA 2024 TSH targets, antithyroid drug protocols' },
    { id: 'hematologic-disorders-pregnancy', name: 'Hematologic Disorders in Pregnancy', description: 'Anemia, thrombocytopenia, sickle cell disease, von Willebrand disease, transfusion medicine per ASH 2024 guidelines' },
    { id: 'pals', name: 'Pediatric Advanced Life Support (PALS)', description: 'Advanced life support algorithms for pediatric patients' },
    { id: 'pediatric-emergencies', name: 'Pediatric Emergencies', description: 'Emergency care considerations specific to children and infants' },
    { id: 'pharmacology-emergencies', name: 'Pharmacology Emergencies', description: 'Emergency medications, dosing, and drug interactions' },
    { id: 'point-of-care-ultrasound', name: 'Point-of-Care Ultrasound', description: 'Bedside ultrasound techniques for emergency diagnosis' },
    { id: 'procedures', name: 'Procedures', description: 'Emergency procedures including intubation, chest tubes, and central lines' },
    { id: 'psychiatric-emergencies', name: 'Psychiatric Emergencies', description: 'Management of agitation, psychosis, and suicidal patients' },
    { id: 'renal-emergencies', name: 'Renal Emergencies', description: 'Acute kidney injury, dialysis complications, and urologic emergencies' },
    { id: 'respiratory-emergencies', name: 'Respiratory Emergencies', description: 'Management of asthma, COPD exacerbations, and respiratory failure' },
    { id: 'sepsis-management', name: 'Sepsis Management', description: 'Recognition and treatment of sepsis and septic shock' },
    { id: 'toxicology', name: 'Toxicology', description: 'Management of overdoses, poisonings, and toxic exposures' },
    { id: 'trauma-management', name: 'Trauma Management', description: 'Systematic approach to trauma evaluation and resuscitation' },
    { id: 'adult-oncology-batch-1', name: 'Adult Oncologic Emergencies - Batch 1', description: 'Emergency complications of cancer and cancer treatments' },
    { id: 'pediatric-oncology-batch-1', name: 'Pediatric Oncologic Emergencies - Batch 1', description: 'Emergency complications in pediatric cancer patients' }
  ];

  return NextResponse.json(topics);
}