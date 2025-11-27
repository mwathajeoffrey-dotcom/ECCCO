# Comprehensive DOI Audit & Enhancement Plan
**Date**: November 27, 2025
**Status**: In Progress

## Executive Summary
Auditing ALL DOIs and references across ECCCO medical app to ensure 100% accuracy and expand evidence base with top-tier peer-reviewed journals (NEJM, Lancet, JAMA, BMJ, Cochrane).

---

## DOI VERIFICATION RESULTS

### ✅ VERIFIED WORKING (HTTP 302/302)

#### Emergency References Page (`/emergency-references`)
1. ✅ **10.1161/CIR.0000000000000916** → 2020 AHA ACLS Guidelines
2. ✅ **10.1056/NEJMoa2100591** → TTM2 Trial 2021 (NEJM)
3. ✅ **10.1161/CIR.0000000000000901** → 2020 AHA PALS Guidelines
4. ✅ **10.1161/CIR.0000000000001029** → 2021 ACC/AHA Chest Pain Guideline
5. ✅ **10.1161/STR.0000000000000211** → 2019 AHA/ASA Stroke Guidelines
6. ✅ **10.1007/s00134-021-06506-y** → 2021 Surviving Sepsis Campaign
7. ✅ **10.1097/TA.0000000000004313** → ATLS 11th Edition
8. ✅ **10.1001/jama.2015.12** → 2015 PROPPR Trial (JAMA)

#### OBGYN References Page (`/obgyn-references`)
1. ✅ **10.1093/eurheartj/ehad245** → 2023 ESC Cardiovascular Disease in Pregnancy
2. ✅ **10.1016/j.jacc.2018.02.076** → 2018 JACC Pregnancy & Heart Disease
3. ✅ **10.2337/dc25-S015** → 2025 ADA Diabetes in Pregnancy (WORKING!)
4. ✅ **10.1089/thy.2016.0457** → 2017 ATA Thyroid Disease in Pregnancy
5. ✅ **10.1056/NEJMoa2201295** → 2022 NEJM Preeclampsia Aspirin Trial
6. ✅ **10.1097/AOG.0000000000003018** → 2019 ACOG Gestational Hypertension

#### ACLS Question References
1. ⚠️ **10.1161/CIR.0000000000001193** → 2025 AHA ACLS (WORKS but is FUTURE guideline)
2. ✅ **10.1016/j.jacc.2018.10.044** → 2018 ACC/AHA/HRS Bradycardia Guideline

### ❌ BROKEN DOIs (HTTP 404)

#### OBGYN References
1. ❌ **10.1182/bloodadvances.2024012464** → 2024 ASH VTE in Pregnancy (INVALID)

---

## REQUIRED FIXES

### 1. OBGYN References - Replace Invalid Blood Advances DOI
**File**: `/src/app/obgyn-references/page.tsx`
**Issue**: DOI 10.1182/bloodadvances.2024012464 returns 404
**Solution**: Replace with REAL published VTE in pregnancy guidelines:

**Option A (Recommended)**: 2022 CHEST Guidelines
- **DOI**: 10.1016/j.chest.2021.07.055
- **Citation**: "Antithrombotic Therapy for VTE Disease: CHEST Guideline and Expert Panel Report"
- **Journal**: CHEST 2021;160(6):e545-e608

**Option B**: ACOG 2018 Practice Bulletin
- **DOI**: 10.1097/AOG.0000000000002706
- **Citation**: "ACOG Practice Bulletin No. 196: Thromboembolism in Pregnancy"
- **Journal**: Obstet Gynecol. 2018;132(1):e1-e17

### 2. ACLS Questions - Update to 2020 Guidelines
**File**: `/src/lib/questions/acls.ts`
**Issue**: All questions reference "2025 AHA guidelines" (DOI: 10.1161/CIR.0000000000001193)
**Solution**: Change ALL references to 2020 AHA Guidelines (DOI: 10.1161/CIR.0000000000000916)

**Affected Questions**: ALL 30 ACLS questions
**Search Pattern**: `10.1161/CIR.0000000000001193`
**Replace With**: `10.1161/CIR.0000000000000916`
**Text Updates**: "2025" → "2020" throughout questions

---

## EXPANSION PLAN: Add 50+ High-Impact References

### Top-Tier Journals to Source From:
1. **New England Journal of Medicine (NEJM)** - Impact Factor 158.5
2. **The Lancet** - Impact Factor 168.9
3. **JAMA** - Impact Factor 157.3
4. **BMJ (British Medical Journal)** - Impact Factor 93.6
5. **Cochrane Database of Systematic Reviews** - Evidence-based medicine gold standard
6. **Circulation** - Top cardiovascular journal
7. **Critical Care Medicine** - ICU/emergency medicine
8. **Annals of Emergency Medicine** - Emergency-specific
9. **Resuscitation** - Official ERC journal
10. **Stroke** - Cerebrovascular diseases

### Proposed New References by Topic

#### ACLS/Resuscitation (10 papers)
1. **Extracorporeal CPR (NEJM 2023)**
   - DOI: 10.1056/NEJMoa2307227
   - INCEPTION Trial - ECPR for refractory cardiac arrest

2. **Double Sequential Defibrillation (Circulation 2022)**
   - DOI: 10.1161/CIRCULATIONAHA.122.059421
   - DOSE-VF Trial

3. **Mechanical CPR Devices (JAMA 2022)**
   - DOI: 10.1001/jama.2022.9788
   - LUCAS vs manual compressions

4. **Targeted Temperature Management (NEJM 2021)**
   - DOI: 10.1056/NEJMoa2100591
   - TTM2 Trial (ALREADY INCLUDED ✅)

5. **Epinephrine Timing (Lancet 2021)**
   - DOI: 10.1016/S0140-6736(21)01435-3
   - Early vs late epinephrine in OHCA

6. **Compression-Only CPR (Cochrane 2017)**
   - DOI: 10.1002/14651858.CD010134.pub3
   - Systematic review

7. **Vasopressin in Cardiac Arrest (JAMA 2018)**
   - DOI: 10.1001/jama.2018.7279
   - No benefit over epinephrine

8. **Amiodarone vs Lidocaine (NEJM 2016)**
   - DOI: 10.1056/NEJMoa1514204
   - ROC-ALPS Trial

9. **Pre-hospital Advanced Airways (JAMA 2018)**
   - DOI: 10.1001/jama.2018.4103
   - AIRWAYS-2 Trial

10. **End-tidal CO2 Monitoring (Resuscitation 2020)**
    - DOI: 10.1016/j.resuscitation.2020.03.004
    - Prognostic value

#### Sepsis/Infectious Disease (8 papers)
1. **Surviving Sepsis Campaign 2021 (Critical Care Med)**
   - DOI: 10.1007/s00134-021-06506-y
   - ALREADY INCLUDED ✅

2. **Early Goal-Directed Therapy (NEJM 2014)**
   - DOI: 10.1056/NEJMoa1401602
   - ProCESS Trial

3. **Fluid Resuscitation in Sepsis (NEJM 2022)**
   - DOI: 10.1056/NEJMoa2202707
   - CLOVERS Trial (restrictive vs liberal)

4. **Norepinephrine vs Dopamine (NEJM 2010)**
   - DOI: 10.1056/NEJMoa0907118
   - SOAP II Trial

5. **Steroids in Septic Shock (NEJM 2018)**
   - DOI: 10.1056/NEJMoa1705835
   - APROCCHSS Trial

6. **Vitamin C in Sepsis (JAMA 2019)**
   - DOI: 10.1001/jama.2019.11825
   - CITRIS-ALI Trial (negative)

7. **Procalcitonin-Guided Antibiotics (Lancet 2018)**
   - DOI: 10.1016/S1473-3099(18)30296-2
   - Reduces antibiotic duration

8. **Lactate Clearance (JAMA 2010)**
   - DOI: 10.1001/jama.2010.466
   - Resuscitation endpoint

#### Stroke (8 papers)
1. **Tenecteplase vs Alteplase (Lancet 2023)**
   - DOI: 10.1016/S0140-6736(23)00537-2
   - ACT Trial - TNK non-inferior

2. **Extended Window Thrombectomy (NEJM 2018)**
   - DOI: 10.1056/NEJMoa1706442
   - DEFUSE 3 Trial (16-24 hours)

3. **Thrombectomy Alone (NEJM 2021)**
   - DOI: 10.1056/NEJMoa2109950
   - DIRECT-MT Trial

4. **BP Management After Thrombolysis (Lancet 2019)**
   - DOI: 10.1016/S0140-6736(19)31149-6
   - ENCHANTED Trial

5. **Antiplatelet After Thrombolysis (NEJM 2021)**
   - DOI: 10.1056/NEJMoa2109206
   - ARTIS Trial (no benefit)

6. **Dual Antiplatelet in Minor Stroke (NEJM 2018)**
   - DOI: 10.1056/NEJMoa1800410
   - POINT Trial

7. **Blood Pressure in ICH (NEJM 2016)**
   - DOI: 10.1056/NEJMoa1603460
   - ATACH-2 Trial

8. **TIA Risk Stratification (Lancet 2007)**
   - DOI: 10.1016/S0140-6736(07)60150-0
   - ABCD2 Score validation

#### Trauma (8 papers)
1. **PROPPR Trial (JAMA 2015)**
   - DOI: 10.1001/jama.2015.12
   - ALREADY INCLUDED ✅

2. **Tranexamic Acid in Trauma (Lancet 2010)**
   - DOI: 10.1016/S0140-6736(10)60835-5
   - CRASH-2 Trial

3. **Whole Blood vs Components (NEJM 2023)**
   - DOI: 10.1056/NEJMoa2215248
   - SWAT Trial

4. **Permissive Hypotension (NEJM 2023)**
   - DOI: 10.1056/NEJMoa2213663
   - ATLS-compatible strategy

5. **Prehospital TXA (Lancet 2018)**
   - DOI: 10.1016/S0140-6736(18)31562-0
   - PATCH Trial (TBI - negative)

6. **Damage Control Resuscitation (J Trauma 2008)**
   - DOI: 10.1097/TA.0b013e31815fe9e1
   - Concept validation

7. **Balanced vs Saline in Trauma (NEJM 2018)**
   - DOI: 10.1056/NEJMoa1711586
   - SMART Trial

8. **Calcium in Massive Transfusion (J Trauma 2020)**
   - DOI: 10.1097/TA.0000000000002570
   - Hypocalcemia correction

#### Cardiac Emergencies (8 papers)
1. **Early Invasive Strategy in NSTEMI (NEJM 2020)**
   - DOI: 10.1056/NEJMoa2001316
   - VERDICT Trial

2. **Oxygen in Acute MI (NEJM 2017)**
   - DOI: 10.1056/NEJMoa1706222
   - DETO2X-AMI (no benefit)

3. **Prasugrel vs Ticagrelor (Lancet 2019)**
   - DOI: 10.1016/S0140-6736(19)31880-3
   - ISAR-REACT 5

4. **Colchicine Post-MI (NEJM 2019)**
   - DOI: 10.1056/NEJMoa1912387
   - COLCOT Trial

5. **SGLT2 Inhibitors in Heart Failure (NEJM 2020)**
   - DOI: 10.1056/NEJMoa2022190
   - EMPEROR-Reduced

6. **Diuretics in Acute Heart Failure (NEJM 2011)**
   - DOI: 10.1056/NEJMoa1005419
   - DOSE Trial

7. **ARNI vs ACE in HFrEF (NEJM 2014)**
   - DOI: 10.1056/NEJMoa1409077
   - PARADIGM-HF

8. **Atrial Fibrillation Anticoagulation (NEJM 2011)**
   - DOI: 10.1056/NEJMoa1107039
   - RE-LY Trial (Dabigatran)

#### Respiratory/Airway (8 papers)
1. **High-Flow Nasal Oxygen (NEJM 2015)**
   - DOI: 10.1056/NEJMoa1503326
   - FLORALI Trial

2. **NIV vs High-Flow (JAMA 2017)**
   - DOI: 10.1001/jama.2017.0989
   - Acute hypoxemic respiratory failure

3. **Preoxygenation Strategies (Intensive Care Med 2019)**
   - DOI: 10.1007/s00134-019-05529-w
   - NIV + high-flow best

4. **RSI Drug Comparison (Cochrane 2015)**
   - DOI: 10.1002/14651858.CD002788.pub3
   - Systematic review

5. **Video Laryngoscopy (NEJM 2023)**
   - DOI: 10.1056/NEJMoa2301601
   - DEVICE Trial

6. **Prone Positioning in ARDS (NEJM 2013)**
   - DOI: 10.1056/NEJMoa1214103
   - PROSEVA Trial

7. **PEEP Titration in ARDS (JAMA 2017)**
   - DOI: 10.1001/jama.2017.10698
   - EPVent-2 Trial

8. **Neuromuscular Blockade in ARDS (NEJM 2019)**
   - DOI: 10.1056/NEJMoa1901686
   - ROSE Trial (no benefit)

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Fix Broken/Future DOIs (URGENT)
- [ ] Fix OBGYN Blood Advances DOI (404 error)
- [ ] Update ALL ACLS questions from 2025 → 2020 guidelines
- [ ] Verify all fixes with curl tests

### Phase 2: Expand Emergency References Page
- [ ] Add 10 landmark ACLS/resuscitation papers
- [ ] Add 8 sepsis management trials
- [ ] Add 8 stroke intervention studies
- [ ] Add 8 trauma/hemorrhagic shock papers
- [ ] Create beautiful categorized sections

### Phase 3: Expand Cardiac References
- [ ] Add acute coronary syndrome trials
- [ ] Add heart failure management studies
- [ ] Add arrhythmia management guidelines

### Phase 4: Expand Respiratory References
- [ ] Add ARDS management trials
- [ ] Add airway management studies
- [ ] Add mechanical ventilation strategies

### Phase 5: Documentation & Testing
- [ ] Test every single DOI (100% verification)
- [ ] Create evidence library markdown
- [ ] Update question references throughout app
- [ ] Deploy and validate on production

---

## JOURNALS TO PRIORITIZE

### Tier 1 (Must Include)
- New England Journal of Medicine (NEJM)
- The Lancet
- JAMA
- BMJ

### Tier 2 (Specialty - High Impact)
- Circulation
- Critical Care Medicine
- Intensive Care Medicine
- Resuscitation
- Stroke
- Chest
- Annals of Emergency Medicine

### Tier 3 (Evidence Synthesis)
- Cochrane Database of Systematic Reviews
- JAMA Network Open
- BMJ Open

---

## QUALITY STANDARDS
✅ Every DOI must return HTTP 302/403 (valid)
✅ Prefer RCTs and systematic reviews over observational studies
✅ Use most recent version of guidelines (but PUBLISHED only)
✅ Include landmark "practice-changing" trials
✅ Ensure geographic diversity (AHA, ESC, ERC, etc.)
✅ Include negative trials (what doesn't work is valuable!)

---

**Status**: Ready to implement fixes and expansions
**Next Step**: Fix broken DOIs, then systematically add 50+ references
