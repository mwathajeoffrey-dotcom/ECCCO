'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ChevronLeft, Calendar, Award, FileText, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Reference {
  title: string;
  journal: string;
  doi: string;
  url: string;
}

interface GuidelineContent {
  id: string;
  name: string;
  organization: string;
  year: string;
  summary: string;
  keyRecommendations: string[];
  clinicalPearls: string[];
  evidenceLevel: string;
  citation: string;
  references: Reference[];
}

export default function OBGYNReferencesPage() {
  const [expandedGuideline, setExpandedGuideline] = useState<string | null>(null);

  const toggleGuideline = (id: string) => {
    setExpandedGuideline(expandedGuideline === id ? null : id);
  };

  const guidelines: { category: string; topics: string[]; guidelines: GuidelineContent[] }[] = [
    {
      category: "Cardiovascular Disease",
      topics: ["Cardiac Disease in Pregnancy"],
      guidelines: [
        {
          id: "esc-2023-cardiac",
          name: "ESC Guidelines 2023/2024 - Cardiovascular Disease in Pregnancy",
          organization: "European Society of Cardiology",
          year: "2023-2024",
          summary: "Comprehensive updated guidelines for managing cardiovascular conditions during pregnancy",
          keyRecommendations: [
            "Modified WHO risk classification for maternal cardiovascular risk assessment (WHO I-IV)",
            "Pre-pregnancy counseling is Class I recommendation for all women with cardiovascular disease",
            "Target blood pressure <140/90 mmHg in chronic hypertension (supported by CHAP trial)",
            "Multidisciplinary team approach mandatory for WHO III-IV conditions",
            "Vaginal delivery preferred unless specific obstetric/cardiac contraindications",
            "Percutaneous balloon mitral valvuloplasty (PBMV) for symptomatic MS (Class I, Level B)",
            "Beta-blockers safe: Labetalol (first-line), metoprolol, propranolol; avoid atenolol"
          ],
          clinicalPearls: [
            "🔴 WHO IV (pregnancy contraindicated): Severe pulmonary hypertension (PAH >60mmHg), severe systemic ventricular dysfunction (EF <30%), peripartum cardiomyopathy with residual dysfunction, severe symptomatic AS/MS",
            "🟡 WHO III (high risk): Mechanical valves, systemic RV, Fontan circulation, unrepaired cyanotic disease, moderate AS/MS, aortic dilatation 45-50mm",
            "🟢 WHO II (small increased risk): Repaired simple lesions (ASD, VSD, PDA), most arrhythmias, mildly dilated aorta (<45mm)",
            "PBMV safe in pregnancy: <1.5 mGy fetal radiation exposure with proper shielding, performed in 2nd-3rd trimester",
            "Anticoagulation for mechanical valves: LMWH weeks 6-12 + 36-delivery, warfarin 12-36 weeks (if dose <5mg/day, can continue throughout)",
            "Cardiac output increases 30-50% by 24 weeks; most decompensation occurs 28-32 weeks"
          ],
          evidenceLevel: "Class I, Level A",
          citation: "Eur Heart J. 2023;44(39):3295-3396. doi:10.1093/eurheartj/ehad245",
          references: [
            {
              title: "2023 ESC Guidelines for the management of cardiovascular disease in pregnancy",
              journal: "European Heart Journal",
              doi: "10.1093/eurheartj/ehad245",
              url: "https://doi.org/10.1093/eurheartj/ehad245"
            }
          ]
        },
        {
          id: "carpreg-risk",
          name: "CARPREG-II Risk Score (2024 Update)",
          organization: "Canadian Cardiovascular Society / Toronto General Hospital",
          year: "2018, Reaffirmed 2024",
          summary: "Validated risk prediction model for maternal cardiac complications during pregnancy",
          keyRecommendations: [
            "Predicts composite adverse maternal cardiac events: Heart failure, arrhythmia, stroke, cardiac death",
            "Risk stratification: 0-1 points = LOW (<5%), 2-3 points = INTERMEDIATE (5-25%), ≥4 points = HIGH (>25%)",
            "Guides intensity of monitoring and need for tertiary care",
            "More accurate than CARPREG-I (c-statistic 0.72 vs 0.66)",
            "Should be calculated at pre-pregnancy counseling or first prenatal visit"
          ],
          clinicalPearls: [
            "📊 CARPREG-II Scoring: Prior cardiac events or arrhythmia (3 points), Baseline NYHA III-IV or cyanosis (3 points), Mechanical valve (3 points), High-risk left heart obstruction (2 points), Systemic AV valve regurgitation (2 points), Pulmonary AV valve regurgitation (1 point), Subpulmonary ventricular dysfunction (1 point)",
            "High-risk left heart lesions: Severe AS (AVA <1.0cm²), MS (MVA <1.5cm²), aortic coarctation",
            "Score 0-1 (5% risk): Standard prenatal care + cardiology consultation each trimester",
            "Score 2-3 (10-15% risk): Maternal-fetal medicine + cardiology co-management, monthly visits",
            "Score ≥4 (>25% risk): Tertiary center, intensive monitoring, consider early delivery planning",
            "Validated in 1938 pregnancies across multiple cardiac conditions"
          ],
          evidenceLevel: "Level B, External Validation Completed",
          citation: "J Am Coll Cardiol. 2018;71(21):2419-2430. doi:10.1016/j.jacc.2018.02.076",
          references: [
            {
              title: "CARPREG II: A Prediction Model for Cardiac Complications During Pregnancy",
              journal: "Journal of the American College of Cardiology",
              doi: "10.1016/j.jacc.2018.02.076",
              url: "https://doi.org/10.1016/j.jacc.2018.02.076"
            }
          ]
        }
      ]
    },
    {
      category: "Endocrine Disorders",
      topics: ["Diabetes in Pregnancy", "Thyroid Disorders in Pregnancy"],
      guidelines: [
        {
          id: "ada-2025-diabetes",
          name: "ADA 2025 Standards of Care - Diabetes in Pregnancy",
          organization: "American Diabetes Association",
          year: "2025",
          summary: "Evidence-based standards for diabetes management before conception and during pregnancy",
          keyRecommendations: [
            "Pre-pregnancy HbA1c target: <6.5%, ideally <6.0% (reduces congenital anomalies from 6-10% to <2%)",
            "Pregnancy glucose targets: Fasting <95 mg/dL, 1-hr postprandial <140 mg/dL, 2-hr postprandial <120 mg/dL",
            "GDM screening: One-step 75g OGTT at 24-28 weeks (IADPSG) OR two-step (50g then 100g)",
            "First-line therapy: Human insulin (NPH, regular) or rapid-acting analogs (aspart, lispro, faster aspart)",
            "Continuous glucose monitoring (CGM) recommended for all insulin-treated pregnant women",
            "Postpartum screening: 75g OGTT at 4-12 weeks, then every 1-3 years lifelong"
          ],
          clinicalPearls: [
            "🎯 HbA1c <6.0% reduces neural tube defects 3-fold, cardiac anomalies 5-fold, caudal regression syndrome",
            "📊 GDM diagnosis (IADPSG criteria): Fasting ≥92 mg/dL, 1-hr ≥180 mg/dL, OR 2-hr ≥153 mg/dL (any ONE value)",
            "📊 Two-step: 50g screen ≥130-140 mg/dL → 100g (Carpenter-Coustan: F ≥95, 1h ≥180, 2h ≥155, 3h ≥140; TWO values)",
            "💊 Metformin: Crosses placenta, inferior to insulin for fetal outcomes, may use if insulin refused (off-label)",
            "💊 Glyburide: NOT recommended (ACOG 2024) - higher neonatal hypoglycemia, macrosomia, NICU admission vs insulin",
            "🔍 Early GDM screening (<24 weeks) if: BMI ≥30, prior GDM, first-degree relative with diabetes, PCOS, prediabetes",
            "📈 Pregnancy increases insulin requirements progressively: ~10-20% T1, 50-100% T2, max 36 weeks",
            "⚠️ Hypoglycemia awareness DECREASES in pregnancy - use CGM, educate on glucagon"
          ],
          evidenceLevel: "Class I, Level A (multiple RCTs)",
          citation: "Diabetes Care. 2025;48(Suppl 1):S282-S294. doi:10.2337/dc25-S015",
          references: [
            {
              title: "ADA 2025 Standards of Care in Diabetes - Management of Diabetes in Pregnancy",
              journal: "Diabetes Care",
              doi: "10.2337/dc25-S015",
              url: "https://doi.org/10.2337/dc25-S015"
            }
          ]
        },
        {
          id: "ata-2024-thyroid",
          name: "ATA 2024 Guidelines - Thyroid Disease in Pregnancy",
          organization: "American Thyroid Association",
          year: "2024 (Reaffirmed from 2017 with 2024 updates)",
          summary: "Comprehensive management of thyroid dysfunction during pregnancy and postpartum",
          keyRecommendations: [
            "Pregnancy-specific TSH ranges: T1: 0.1-2.5 mIU/L, T2: 0.2-3.0 mIU/L, T3: 0.3-3.0 mIU/L",
            "Overt hypothyroidism (TSH >10 mIU/L OR TSH 4-10 with low FT4): Immediate levothyroxine treatment",
            "Subclinical hypothyroidism (TSH 2.5-10, normal FT4) + TPO antibodies: Treat with levothyroxine",
            "Subclinical hypothyroidism WITHOUT TPO antibodies: Consider treatment if TSH >4 mIU/L",
            "Universal screening NOT recommended; targeted screening for high-risk women",
            "Hyperthyroidism T1: PTU preferred; T2-T3: Switch to methimazole (MMI) after organogenesis"
          ],
          clinicalPearls: [
            "🔬 Levothyroxine dose ↑ 25-30% as soon as pregnancy confirmed (TBG increases → more bound T4 → need higher dose)",
            "⚡ PTU in T1 (MMI teratogenic: aplasia cutis, choanal/esophageal atresia, omphalocele 2-3%)",
            "⚡ Methimazole T2-T3 (PTU hepatotoxicity: fulminant hepatic failure 1:10,000, transplant/death risk)",
            "🎯 Treated hypothyroidism target: TSH <2.5 mIU/L throughout pregnancy (check q4 weeks T1-T2, at 30 weeks)",
            "🚫 Radioactive iodine (I-131) ABSOLUTELY contraindicated - ablates fetal thyroid after 12 weeks gestation",
            "👶 Neonatal thyrotoxicosis risk: If maternal TSI/TRAb ≥3x upper limit at 18-22 weeks → monitor neonate",
            "💊 Levothyroxine best absorbed: Empty stomach, 30-60 min before breakfast, separate from prenatal vitamins (iron/calcium) by 4 hrs",
            "📉 Postpartum: Decrease LT4 to pre-pregnancy dose; PPT occurs in 5-9% (hyperthyroid phase 1-6 mo → hypothyroid 4-8 mo)"
          ],
          evidenceLevel: "Strong Recommendation, Moderate-Quality Evidence",
          citation: "Thyroid. 2017;27(3):315-389. doi:10.1089/thy.2016.0457 (Reaffirmed 2024)",
          references: [
            {
              title: "2017 Guidelines of the American Thyroid Association for the Diagnosis and Management of Thyroid Disease During Pregnancy and the Postpartum",
              journal: "Thyroid",
              doi: "10.1089/thy.2016.0457",
              url: "https://doi.org/10.1089/thy.2016.0457"
            }
          ]
        }
      ]
    },
    {
      category: "Hypertensive Disorders",
      topics: ["Hypertensive Disorders in Pregnancy"],
      guidelines: [
        {
          id: "chap-trial-2022",
          name: "CHAP Trial 2022 - Chronic Hypertension and Pregnancy",
          organization: "NIH/NHLBI Multicenter RCT (61 sites, 2408 women)",
          year: "2022",
          summary: "LANDMARK TRIAL: Changed practice paradigm for blood pressure treatment thresholds in chronic hypertension during pregnancy",
          keyRecommendations: [
            "Treat chronic hypertension if BP ≥140/90 mmHg (previous standard was ≥150-160/100-110)",
            "Target BP: 130-155/80-105 mmHg (NOT lower - increased SGA if BP <130/80)",
            "Primary outcome: Preeclampsia with severe features, medically indicated preterm birth <35 weeks, placental abruption, or fetal/neonatal death",
            "Active treatment group: 30.2% composite outcome vs 37.0% standard care (RR 0.82, p<0.001)",
            "NO increase in small-for-gestational-age (SGA) infants with treatment (11% both groups)",
            "First-line agents: Labetalol, nifedipine XL, methyldopa (per ACOG)"
          ],
          clinicalPearls: [
            "🎯 This trial CHANGED PRACTICE: Old threshold 150-160/100-110 → New threshold 140/90 mmHg",
            "📊 Number needed to treat (NNT): 15 women to prevent 1 serious adverse pregnancy outcome",
            "⚠️ Do NOT overtreat: BP <130/80 associated with increased SGA (treat to 130-155/80-105)",
            "✅ Severe range BP (≥160/110): Immediate treatment required (stroke prevention)",
            "🏥 CHAP excluded: Pregestational diabetes requiring medication, renal disease with Cr >1.2, prior stroke, on >2 antihypertensives",
            "💊 Active treatment used: Labetalol (most common), nifedipine XL, or other ACOG-recommended agents",
            "📈 Maternal benefit: Reduced severe preeclampsia (2.5% vs 2.9%), less abruption, fewer maternal morbidities",
            "👶 Fetal safety confirmed: Birth weight, SGA rates, NICU admission, neonatal outcomes SIMILAR both groups"
          ],
          evidenceLevel: "Level I Evidence (RCT), Class IA Recommendation",
          citation: "N Engl J Med. 2022;386(19):1781-1792. doi:10.1056/NEJMoa2201295",
          references: [
            {
              title: "Chronic Hypertension and Pregnancy (CHAP) Trial: Blood-Pressure Targets in Pregnant Women with Chronic Hypertension",
              journal: "New England Journal of Medicine",
              doi: "10.1056/NEJMoa2201295",
              url: "https://doi.org/10.1056/NEJMoa2201295"
            }
          ]
        },
        {
          id: "acog-202-2019",
          name: "ACOG Practice Bulletin No. 203 (2024 Reaffirmed) - Gestational Hypertension & Preeclampsia",
          organization: "American College of Obstetricians and Gynecologists",
          year: "2019, Reaffirmed 2024",
          summary: "Evidence-based guidelines for diagnosis and management of hypertensive disorders in pregnancy",
          keyRecommendations: [
            "Gestational HTN: BP ≥140/90 after 20 weeks without proteinuria or severe features",
            "Preeclampsia: BP ≥140/90 + proteinuria (≥300mg/24h or P/Cr ≥0.3) OR severe features without proteinuria",
            "Severe features: BP ≥160/110, thrombocytopenia <100K, Cr >1.1, transaminases 2x normal, pulmonary edema, cerebral/visual symptoms",
            "Severe BP (≥160/110): Immediate treatment within 30-60 minutes (stroke prevention)",
            "Delivery timing: ≥37 weeks with gestational HTN, 34-37 weeks with preeclampsia (individualized), immediately if eclampsia/HELLP",
            "Aspirin prophylaxis: 81-162mg daily from 12-28 weeks (start before 16 weeks) for high-risk women"
          ],
          clinicalPearls: [
            "🚨 Severe features WITHOUT elevated BP still = preeclampsia with severe features (e.g., platelets <100K alone)",
            "💊 Acute severe HTN treatment: Labetalol IV 20mg → 40mg → 80mg q10min (max 300mg) OR Hydralazine IV 5-10mg q20min OR Immediate-release nifedipine PO 10-20mg q20min",
            "⚡ Magnesium sulfate: 4-6g loading dose, 1-2g/hr maintenance for seizure prophylaxis (preeclampsia with severe features, eclampsia)",
            "🎯 Magnesium therapeutic range: 4-7 mEq/L; monitor reflexes, respirations, urine output (stop if reflexes absent, RR <12, UO <30mL/hr)",
            "📊 Aspirin reduces preeclampsia 15-20% in high-risk women (prior PE, chronic HTN, DM, renal disease, autoimmune, multifetal)",
            "⏰ Delivery timing by GA: 37-0 weeks mild gestational HTN/PE, 34-0 weeks PE with severe features, Immediate if eclampsia/HELLP/placental abruption/non-reassuring fetal status",
            "🔬 Labs for severe PE: CBC (platelets), CMP (Cr, transaminases), LDH (if HELLP suspected), uric acid",
            "🧠 Neurologic symptoms (HA, vision changes) + BP ≥140/90 = severe features regardless of BP level"
          ],
          evidenceLevel: "Strong Recommendations, High-Quality Evidence",
          citation: "Obstet Gynecol. 2019;133(1):e1-e25. doi:10.1097/AOG.0000000000003018 (Reaffirmed 2024)",
          references: [
            {
              title: "ACOG Practice Bulletin No. 203: Chronic Hypertension in Pregnancy",
              journal: "Obstetrics & Gynecology",
              doi: "10.1097/AOG.0000000000003018",
              url: "https://doi.org/10.1097/AOG.0000000000003018"
            }
          ]
        }
      ]
    },
    {
      category: "Hematologic & Thrombotic Disorders",
      topics: ["Thromboembolism in Pregnancy", "Hematologic Disorders in Pregnancy"],
      guidelines: [
        {
          id: "ash-2024-vte",
          name: "ASH 2024 Guidelines - VTE in Pregnancy",
          organization: "American Society of Hematology",
          year: "2024",
          summary: "Comprehensive guidelines for prevention and treatment of venous thromboembolism in pregnancy",
          keyRecommendations: [
            "VTE prophylaxis with LMWH for women with prior VTE + high-risk thrombophilia (antithrombin deficiency, antiphospholipid syndrome)",
            "Treatment of acute VTE: LMWH throughout pregnancy (warfarin contraindicated), continue 6 weeks postpartum (minimum 3 months total)",
            "LMWH dosing: Therapeutic = 1 mg/kg q12h OR 1.5 mg/kg once daily; Prophylactic = 40mg daily enoxaparin",
            "Anti-Xa monitoring: Target 0.6-1.0 (q12h dosing, 4hrs post-injection) or 1.0-2.0 (once daily, 4hrs post)",
            "Delivery planning: Hold LMWH 24 hours before planned delivery for neuraxial anesthesia",
            "IVC filter: ONLY if contraindication to anticoagulation (active hemorrhage) - NOT routine"
          ],
          clinicalPearls: [
            "🔴 Pregnancy = 5-fold ↑ VTE risk (hypercoagulable state, venous stasis, vascular injury at delivery)",
            "⚡ Thrombophilias requiring prophylaxis: Antithrombin deficiency (highest risk 40%), APS (15-30%), Homozygous Factor V Leiden, Prothrombin G20210A mutation",
            "💉 LMWH advantages: No teratogenic, doesn't cross placenta, less HIT, no monitoring usually needed (unless extremes weight/renal)",
            "📊 Therapeutic LMWH: Enoxaparin 1mg/kg q12h OR dalteparin 100 U/kg q12h OR tinzaparin 175 U/kg once daily",
            "⏰ Neuraxial timing: 12 hours after prophylactic LMWH, 24 hours after therapeutic LMWH before epidural/spinal",
            "🩸 DVT diagnosis in pregnancy: Compression ultrasound (if negative + high suspicion → MR venography, NOT CT pulmonary angiogram first)",
            "💨 PE diagnosis: Start with ultrasound legs; if negative → VQ scan (1st choice, 0.1mGy fetal radiation) or CTPA (acceptable if VQ unavailable)",
            "⚠️ DON'T use: Warfarin (embryopathy 6-12 weeks), DOACs (lack safety data, cross placenta)"
          ],
          evidenceLevel: "Strong Recommendation, Moderate Evidence",
          citation: "Blood Adv. 2024;8(12):3144-3168. doi:10.1182/bloodadvances.2024012464",
          references: [
            {
              title: "ASH 2024 Guidelines for Management of Venous Thromboembolism: Pregnancy",
              journal: "Blood Advances",
              doi: "10.1182/bloodadvances.2024012464",
              url: "https://doi.org/10.1182/bloodadvances.2024012464"
            }
          ]
        },
        {
          id: "asra-2024-neuraxial",
          name: "ASRA 2024 Guidelines - Neuraxial Anesthesia & Anticoagulation",
          organization: "American Society of Regional Anesthesia and Pain Medicine",
          year: "2024",
          summary: "Evidence-based timing recommendations for neuraxial procedures in anticoagulated patients",
          keyRecommendations: [
            "Prophylactic LMWH: Hold 12 hours before neuraxial procedure; restart 12 hours after catheter removal",
            "Therapeutic LMWH: Hold 24 hours before neuraxial; restart 24 hours after catheter removal",
            "UFH prophylactic (5000U SC): Hold 4-6 hours; restart 1 hour after catheter removal",
            "UFH therapeutic IV: Stop 4-6 hours, check aPTT (must be normal); restart 1 hour after catheter removal",
            "Aspirin/NSAIDs: NO contraindication to neuraxial procedures",
            "Clopidogrel: Hold 7 days; Ticagrelor: Hold 5 days before neuraxial"
          ],
          clinicalPearls: [
            "⏰ MEMORIZE: Prophylactic LMWH = 12/12 hours, Therapeutic LMWH = 24/24 hours (both before and after)",
            "🎯 Rationale: Preventing spinal epidural hematoma (<1:150,000 without anticoagulation; higher with LMWH if timing ignored)",
            "⚠️ Bloody/traumatic tap: Consider delaying catheter insertion 24 hours OR delaying anticoagulation restart",
            "📊 Catheter removal: Equally important as insertion timing - must maintain anticoagulant-free window",
            "💊 Aspirin 81mg OK: Antiplatelet doses don't increase spinal hematoma risk (can proceed with neuraxial)",
            "🚫 Absolute contraindication: Therapeutic anticoagulation within timeframe, coagulopathy (INR >1.5, platelets <70K), patient refusal",
            "🩸 Spinal hematoma signs: Severe back pain, motor/sensory deficit, bowel/bladder dysfunction → EMERGENCY MRI + neurosurgery consult",
            "✅ Best practice: Coordinate with anesthesia early in labor/before scheduled C-section to plan anticoagulation timing"
          ],
          evidenceLevel: "Strong Recommendation, Moderate-Quality Evidence",
          citation: "Reg Anesth Pain Med. 2024;49(5):e1-e36. doi:10.1136/rapm-2023-105150",
          references: [
            {
              title: "ASRA 2024 Guidelines on Neuraxial Anesthesia and Anticoagulation",
              journal: "Regional Anesthesia and Pain Medicine",
              doi: "10.1136/rapm-2023-105150",
              url: "https://doi.org/10.1136/rapm-2023-105150"
            }
          ]
        }
      ]
    },
    {
      category: "Infectious Disease",
      topics: ["Infectious Disease in Pregnancy"],
      guidelines: [
        {
          id: "cdc-2024-hiv",
          name: "CDC 2024 Guidelines - HIV in Pregnancy",
          organization: "Centers for Disease Control and Prevention",
          year: "2024",
          summary: "Updated guidelines for prevention of mother-to-child transmission of HIV",
          keyRecommendations: [
            "Universal opt-out HIV screening at first prenatal visit for ALL pregnant women (repeat 3rd trimester if high-risk)",
            "Antiretroviral therapy (ART) for ALL HIV+ pregnant women regardless of CD4 count or viral load",
            "Goal: Viral load <50 copies/mL by delivery (reduces transmission to <1%)",
            "Preferred regimens: Integrase inhibitor-based (dolutegravir, raltegravir) + 2 NRTIs",
            "Cesarean delivery at 38 weeks if VL >1000 copies/mL; vaginal delivery OK if VL <1000",
            "Infant prophylaxis: High-risk (VL >1000): ZDV + 3TC + NVP 6 weeks; Low-risk (VL <50): ZDV alone 4-6 weeks"
          ],
          clinicalPearls: [
            "🎯 U=U concept: Undetectable = Untransmittable (VL <50 → <1% transmission with vaginal delivery)",
            "💊 Start ART ASAP: If new diagnosis in pregnancy, initiate immediately (don't wait for resistance testing results)",
            "📊 Transmission risk by VL: >100K copies = 40%, 1K-10K = 15%, <1K = 2%, <50 = <1%",
            "⚡ Rapid HIV test in labor: If no prenatal care/unknown status → immediate testing → start ART if positive",
            "🚫 Avoid: Efavirenz in T1 (neural tube defects), breastfeeding in US (6-month transmission risk), fetal scalp electrodes, prolonged membrane rupture",
            "📈 Viral load monitoring: Baseline → 2-4 weeks after ART start/change → monthly until VL <50 → q3 months → at 34-36 weeks",
            "💉 Intrapartum ZDV infusion if VL >1000 or unknown: 2mg/kg load over 1hr → 1mg/kg/hr until delivery",
            "👶 Infant testing: HIV DNA PCR at 14-21 days, 1-2 months, 4-6 months (ALL must be negative to exclude infection)"
          ],
          evidenceLevel: "Class A, Level I Evidence",
          citation: "MMWR Recomm Rep. 2024;73(1):1-48. doi:10.15585/mmwr.rr7301a1",
          references: [
            {
              title: "CDC 2024 Recommendations for the Use of Antiretroviral Drugs During Pregnancy and Interventions to Reduce Perinatal HIV Transmission",
              journal: "MMWR Recommendations and Reports",
              doi: "10.15585/mmwr.rr7301a1",
              url: "https://doi.org/10.15585/mmwr.rr7301a1"
            }
          ]
        },
        {
          id: "cdc-2021-gbs",
          name: "CDC 2019 Guidelines (Reaffirmed 2024) - Group B Streptococcus",
          organization: "Centers for Disease Control and Prevention",
          year: "2019, Reaffirmed 2024",
          summary: "Prevention of early-onset neonatal GBS disease through intrapartum antibiotic prophylaxis",
          keyRecommendations: [
            "Universal GBS screening at 36-37+6 weeks gestation (vaginal-rectal swab)",
            "Intrapartum antibiotic prophylaxis (IAP) if: Positive GBS culture, GBS bacteriuria in current pregnancy, or prior infant with GBS disease",
            "Penicillin G 5 million units IV loading → 2.5-3 million units IV q4h until delivery (first-line)",
            "Adequate IAP: ≥1 dose ≥4 hours before delivery",
            "NO IAP needed: Planned cesarean delivery before labor + intact membranes (even if GBS+)",
            "Neonatal observation: Well-appearing term infants with adequate IAP → routine care"
          ],
          clinicalPearls: [
            "🦠 GBS = most common cause of early-onset neonatal sepsis (incidence 0.23/1000 live births with IAP, was 1.7/1000 before screening)",
            "💊 Alternative regimens: Ampicillin 2g IV → 1g q4h OR Cefazolin 2g IV → 1g q8h (if PCN allergy but low anaphylaxis risk)",
            "⚠️ Severe PCN allergy (anaphylaxis history): Clindamycin 900mg IV q8h OR Vancomycin 1g IV q12h (use susceptibility testing if available)",
            "🎯 Adequate IAP definition: ≥4 hours of antibiotics before delivery (reduces neonatal colonization 80-90%)",
            "🚫 DON'T give IAP for: Colonization in prior pregnancy (must re-screen), negative screen >5 weeks ago (rescreen if still pregnant >42 weeks)",
            "📊 Risk factors for inadequate IAP: Precipitous labor, preterm labor <37 weeks, prolonged membrane rupture >18 hours, intrapartum fever ≥100.4°F",
            "🏥 Neonatal management algorithm: Well-appearing + adequate IAP + ≥37 weeks → observation only; If any high-risk factor → labs + empiric antibiotics",
            "🔬 Culture technique matters: Vaginal THEN rectal swab (increased yield), selective enrichment broth, test for clindamycin/erythromycin resistance"
          ],
          evidenceLevel: "Strong Recommendation, Moderate-Quality Evidence",
          citation: "MMWR Recomm Rep. 2019;68(4):1-24. doi:10.15585/mmwr.rr6804a1 (Reaffirmed 2024)",
          references: [
            {
              title: "CDC 2019 Prevention of Perinatal Group B Streptococcal Disease - Revised Guidelines",
              journal: "MMWR Recommendations and Reports",
              doi: "10.15585/mmwr.rr6804a1",
              url: "https://doi.org/10.15585/mmwr.rr6804a1"
            }
          ]
        }
      ]
    },
    {
      category: "Renal Disease",
      topics: ["Renal Disease in Pregnancy"],
      guidelines: [
        {
          id: "kdigo-2024-ckd",
          name: "KDIGO 2024 Guidelines - CKD in Pregnancy",
          organization: "Kidney Disease: Improving Global Outcomes",
          year: "2024",
          summary: "Comprehensive management of chronic kidney disease during pregnancy",
          keyRecommendations: [
            "Pre-pregnancy counseling essential: Assess baseline function, proteinuria, BP control",
            "CKD staging affects outcomes: Stage 1-2 (Cr <1.4) good prognosis; Stage 3-4 (Cr >1.4) increased maternal/fetal risk; Stage 5 (Cr >5) very high risk",
            "Target BP <140/90 mmHg (supported by CHAP trial); avoid ACE-I/ARBs (teratogenic)",
            "Increased preeclampsia risk: 20-40% in CKD (higher with proteinuria ≥1g/day)",
            "Dialysis in pregnancy: Intensive regimen (≥6 days/week, 20+ hrs/week hemodialysis or daily PD) improves outcomes",
            "Fetal monitoring: Increase frequency in T3 (NST, growth scans q2-4 weeks)"
          ],
          clinicalPearls: [
            "📊 Outcomes by baseline Cr: <1.4 mg/dL = 90-95% live birth; 1.4-2.0 = 70-80% live birth + 25% worsening renal function; >2.5 = 50-60% live birth + high risk permanent renal function decline",
            "⚠️ Proteinuria increases in pregnancy: Baseline + pregnancy-induced + possible superimposed preeclampsia (difficult to differentiate)",
            "💊 Safe antihypertensives: Labetalol, nifedipine, methyldopa; AVOID: ACE-I/ARBs (renal dysgenesis, oligohydramnios), atenolol (IUGR)",
            "🩸 Dialysis targets: Pre-dialysis BUN <50 mg/dL (reduces polyhydramnios, improves fetal outcomes), ultrafiltration cautious (avoid hypotension → uteroplacental insufficiency)",
            "📈 Dialysis initiation in pregnancy: Start earlier than non-pregnant (GFR 10-15 mL/min vs <10), more frequent/longer sessions",
            "🎯 Superimposed preeclampsia vs CKD: New-onset HTN + ↑proteinuria + thrombocytopenia/transaminitis + symptoms = likely preeclampsia",
            "🏥 High-risk pregnancy: Co-management nephrology + maternal-fetal medicine mandatory for CKD stage ≥3",
            "⏰ Delivery timing: CKD alone (well-controlled) → 38-39 weeks; CKD + complications → individualized, often 34-37 weeks"
          ],
          evidenceLevel: "Strong Recommendation, Moderate Evidence",
          citation: "Kidney Int. 2024;105(3S):S1-S117. doi:10.1016/j.kint.2023.10.017",
          references: [
            {
              title: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease",
              journal: "Kidney International",
              doi: "10.1016/j.kint.2023.10.017",
              url: "https://doi.org/10.1016/j.kint.2023.10.017"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/exam" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Exam
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clinical Guidelines & References</h1>
              <p className="text-gray-600 mt-1">Read full guidelines, landmark trials, and key recommendations directly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Evidence-Based Excellence</h2>
              <p className="text-gray-700 mb-3">
                All 240 medical comorbidity questions are based on these guidelines. Click any guideline below to read the full key recommendations, 
                clinical pearls with specific data, and evidence levels - no external navigation required!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Major Guidelines</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">2024-25</div>
                  <div className="text-sm text-gray-600">Most Current Evidence</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-pink-200">
                  <div className="text-2xl font-bold text-pink-600">Landmark</div>
                  <div className="text-sm text-gray-600">Trials & Meta-analyses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines by Category */}
        {guidelines.map((category, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Topics: {category.topics.join(", ")}
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                {category.guidelines.map((guideline) => (
                  <div key={guideline.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all">
                    {/* Collapsed Header */}
                    <button
                      onClick={() => toggleGuideline(guideline.id)}
                      className="w-full px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-900">{guideline.name}</h4>
                            <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              <Calendar className="w-3 h-3" />
                              {guideline.year}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{guideline.organization}</p>
                          <p className="text-gray-700 text-sm">{guideline.summary}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedGuideline === guideline.id ? (
                            <ChevronUp className="w-6 h-6 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedGuideline === guideline.id && (
                      <div className="px-5 py-4 bg-white border-t border-gray-200 space-y-4">
                        {/* Key Recommendations */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            Key Recommendations
                          </h5>
                          <ul className="space-y-2">
                            {guideline.keyRecommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-gray-700 text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Clinical Pearls */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            💡 Clinical Pearls & Key Data
                          </h5>
                          <ul className="space-y-2">
                            {guideline.clinicalPearls.map((pearl, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold flex-shrink-0 mt-0.5">→</span>
                                <span className="text-gray-800 text-sm leading-relaxed">{pearl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Evidence Level & Citation */}
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                                {guideline.evidenceLevel}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 italic">{guideline.citation}</p>
                          </div>
                        </div>

                        {/* References & Further Reading */}
                        <div className="pt-3 border-t border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                            Read Full Paper
                          </h5>
                          <div className="space-y-2">
                            {guideline.references.map((ref, i) => (
                              <a
                                key={i}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all group"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                      {ref.title}
                                    </p>
                                    <p className="text-xs text-gray-600 mb-2">
                                      <span className="font-medium">{ref.journal}</span>
                                    </p>
                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">
                                      <span className="font-semibold">DOI:</span> {ref.doi}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1 group-hover:text-blue-700 transition-colors" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Apply these evidence-based guidelines with 240 questions on medical comorbidities in pregnancy, all incorporating the data you just reviewed.
          </p>
          <Link
            href="/exam"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Practicing →
          </Link>
        </div>
      </main>
    </div>
  );
}
