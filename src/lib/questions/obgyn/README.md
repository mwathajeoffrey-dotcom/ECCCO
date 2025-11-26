# OB/GYN Question Bank

**Total Questions:** 240  
**Topics:** 8 specialized areas  
**Last Updated:** November 26, 2025

---

## 📁 Folder Organization

This folder contains all obstetric and gynecologic emergency medicine questions, organized into 7 specialized topic areas.

### Question Files

| File | Topic | Questions | Category |
|------|-------|-----------|----------|
| `placenta-previa.ts` | Placenta Previa | 30 | Obstetric |
| `placental-abruption.ts` | Placental Abruption | 30 | Obstetric |
| `preeclampsia.ts` | Preeclampsia & Eclampsia | 30 | Obstetric |
| `preterm-labour.ts` | Preterm Labour & PPROM | 30 | Obstetric |
| `obstetric-emergencies.ts` | Acute Obstetric Emergencies | 30 | Obstetric |
| `vasa-previa-rupture.ts` | Vasa Previa & Uterine Rupture | 30 | Obstetric |
| `gyn-pain-bleeding.ts` | Gynecologic Pain & Bleeding | 30 | Gynecologic |
| `general-obgyn-emergencies.ts` | General OB/GYN Emergencies | 30 | Mixed |

---

## 🎯 Topic Categories

### Obstetric Topics (180 questions)

#### High-Risk Pregnancy Conditions
- **Placenta Previa** (`placenta-previa.ts`)
  - Placental implantation over cervical os
  - Classification, diagnosis, management
  - Delivery timing and recommendations
  
- **Placental Abruption** (`placental-abruption.ts`)
  - Premature placental separation
  - Risk factors, clinical presentation
  - Emergency management protocols

#### Hypertensive Disorders
- **Preeclampsia & Eclampsia** (`preeclampsia.ts`)
  - Diagnostic criteria and severe features
  - HELLP syndrome
  - Magnesium sulfate protocols
  - Antihypertensive management
  - Delivery timing and postpartum care

#### Preterm Complications
- **Preterm Labour & PPROM** (`preterm-labour.ts`)
  - Tocolytic therapy
  - Antenatal corticosteroids
  - Magnesium for neuroprotection
  - GBS prophylaxis
  - PPROM management

#### Acute Emergencies
- **Obstetric Emergencies** (`obstetric-emergencies.ts`)
  - Umbilical cord prolapse
  - Shoulder dystocia (HELPERR)
  - Postpartum hemorrhage
  - Uterine inversion
  - Amniotic fluid embolism
  
- **Vasa Previa & Uterine Rupture** (`vasa-previa-rupture.ts`)
  - Vasa previa diagnosis and management
  - Uterine rupture risk factors
  - TOLAC/VBAC considerations

### Gynecologic Topics (60 questions)

- **Gynecologic Pain & Bleeding** (`gyn-pain-bleeding.ts`)
  - Postmenopausal bleeding
  - Endometrial cancer screening
  - Ovarian torsion
  - Pelvic inflammatory disease
  - Endometriosis
  - Uterine fibroids

- **General OB/GYN Emergencies** (`general-obgyn-emergencies.ts`)
  - Ectopic pregnancy
  - Ovarian torsion (non-pregnant)
  - Hyperemesis gravidarum
  - Gestational trophoblastic disease
  - Trauma in pregnancy
  - Postpartum complications (mastitis, PE)
  - Vulvovaginal conditions
  - Fibroid degeneration
  - Intrahepatic cholestasis

---

## 🔧 Usage

### Import All OB/GYN Questions
```typescript
import { obgynQuestions } from '@/lib/questions/obgyn';
// Returns: Array of 240 questions
```

### Import Specific Topic
```typescript
import { placentaPreviaQuestions } from '@/lib/questions/obgyn';
import { preeclampsiaQuestions } from '@/lib/questions/obgyn';
// etc.
```

### Get Question Counts
```typescript
import { obgynQuestionCount } from '@/lib/questions/obgyn';
console.log(obgynQuestionCount);
// {
//   placentaPrevia: 30,
//   placentalAbruption: 30,
//   preeclampsia: 30,
//   pretermLabour: 30,
//   obstetricEmergencies: 30,
//   gynPainBleeding: 30,
//   vasaPreviaRupture: 30,
//   generalObgynEmergencies: 30,
//   obstetricTotal: 180,
//   gynecologicTotal: 60,
//   total: 240
// }
```

---

## 📚 Question Structure

Each question follows this standardized format:

```typescript
{
  id: string,              // e.g., "pp-001", "pre-015"
  question: string,        // Clinical scenario or question
  options: string[],       // 4 answer options
  correctIndex: number,    // Index of correct answer (0-3)
  explanation: string,     // Detailed explanation with clinical reasoning
  references: string[],    // Evidence-based sources (ACOG, RCOG, etc.)
  difficulty: string,      // 'easy' | 'medium' | 'hard'
  topicId: string,         // Topic identifier for filtering
  category: string         // 'obstetric' | 'gynecologic'
}
```

---

## 🎓 Clinical Guidelines Referenced

All questions are based on current evidence-based guidelines:

- **ACOG Practice Bulletins** (2020-2025)
  - No. 183: Postpartum Hemorrhage
  - No. 205: Vaginal Birth After Cesarean
  - No. 222: Gestational Hypertension and Preeclampsia
  - And others

- **RCOG Green-top Guidelines**
- **WHO Recommendations**
- **Cochrane Reviews**
- **SMFM Consults**
- **Major Clinical Trials**

---

## 🔄 Adding New Topics

When adding new OB/GYN topics:

1. **Create new file** in this folder (e.g., `gestational-diabetes.ts`)
2. **Follow naming convention**: `kebab-case.ts`
3. **Export questions array**: `export const gestationalDiabetesQuestions: Question[] = [...]`
4. **Update `index.ts`**: Add import and export
5. **Update this README**: Add to table and categories
6. **Update API**: Add topic to `/api/topics/route.ts`
7. **Test**: Verify questions load correctly

---

## 📊 Quality Standards

All questions in this folder meet these criteria:

✅ Evidence-based on current guidelines (2020-2025)  
✅ Peer-reviewed references included  
✅ Clear clinical scenarios  
✅ Detailed explanations with reasoning  
✅ Appropriate difficulty levels  
✅ Relevant to emergency medicine practice  
✅ Updated for recent guideline changes

---

## 🔍 Question ID Prefixes

For easy identification:

| Prefix | Topic |
|--------|-------|
| `pp-` | Placenta Previa |
| `pa-` | Placental Abruption |
| `pre-` | Preeclampsia |
| `ptl-` | Preterm Labour |
| `obe-` | Obstetric Emergencies |
| `gpb-` | Gynecologic Pain/Bleeding |
| `vr-` | Vasa Previa/Rupture |
| `goe-` | General OB/GYN Emergencies |

---

## 📈 Future Expansion Topics

Potential topics for future development:

### Obstetric
- Gestational Diabetes Management
- Fetal Heart Rate Monitoring
- Operative Vaginal Delivery
- Cesarean Section Complications
- Multiple Gestation Complications
- Maternal Cardiac Disease
- Thromboembolism in Pregnancy

### Gynecologic
- Ectopic Pregnancy
- Ovarian Cyst Complications
- Sexual Assault Examination
- Gynecologic Oncology Emergencies
- Contraception Emergencies
- Menstrual Disorders

---

## 🛠️ Maintenance Notes

**Last Review:** November 26, 2025  
**Next Review Due:** May 2026 (6 months)  
**Guideline Updates:** Check ACOG/RCOG quarterly  

When updating:
- Review for guideline changes
- Update references
- Verify medications/dosing
- Check for new evidence
- Update difficulty ratings based on usage data

---

## 📞 Contact

For questions about this question bank or to suggest improvements:
- Review clinical accuracy concerns with medical education team
- Submit new topic requests via project management system
- Report technical issues via GitHub issues

---

**Navigation:** [Back to Questions Index](../README.md) | [View API Documentation](../../../app/api/README.md)
