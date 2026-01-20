import { Question } from '../types';

export const gynPainBleedingQuestions: Question[] = [
  {
    id: 'gpb-001',
    question: 'A 62-year-old postmenopausal woman presents with vaginal bleeding. What is the most important initial diagnostic test?',
    options: [
      'Pap smear',
      'Endometrial biopsy',
      'Transvaginal ultrasound',
      'CA-125 level'
    ],
    correctIndex: 1,
    explanation: 'Endometrial biopsy is ESSENTIAL for any postmenopausal bleeding to rule out endometrial cancer (10-15% of cases). Transvaginal ultrasound can assess endometrial thickness (<4-5mm suggests low cancer risk), but biopsy provides tissue diagnosis. Pap smear evaluates cervix, not endometrium. Most common cause of postmenopausal bleeding is atrophy, but cancer must be excluded.',
    references: [
      'ACOG Committee Opinion No. 734: The Role of Transvaginal Ultrasonography in Evaluating the Endometrium. Obstet Gynecol. 2018;131(5):e124-e129',
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-002',
    question: 'What endometrial thickness on transvaginal ultrasound in a postmenopausal woman with bleeding has high negative predictive value for endometrial cancer?',
    options: [
      '<1 mm',
      '<4 mm',
      '<8 mm',
      '<12 mm'
    ],
    correctIndex: 1,
    explanation: 'Endometrial thickness <4-5 mm in postmenopausal bleeding has 96-99% negative predictive value for endometrial cancer. Can consider deferring biopsy if <4mm AND bleeding resolves. If >4mm or recurrent bleeding, endometrial sampling required. Note: thickness varies with hormone therapy use. Heterogeneous or irregular endometrium requires biopsy regardless of thickness.',
    references: [
      'ACOG Committee Opinion No. 734: The Role of Transvaginal Ultrasonography. Obstet Gynecol. 2018;131(5):e124-e129',
      'Smith-Bindman R, et al. Endovaginal ultrasound to exclude endometrial cancer. JAMA. 1998;280(17):1510-1517'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-003',
    question: 'What is the most common type of endometrial cancer?',
    options: [
      'Clear cell carcinoma',
      'Endometrioid adenocarcinoma',
      'Serous carcinoma',
      'Carcinosarcoma'
    ],
    correctIndex: 1,
    explanation: 'Endometrioid adenocarcinoma (Type I) accounts for 75-80% of endometrial cancers. Estrogen-related, typically lower grade, better prognosis. Type II (serous, clear cell, carcinosarcoma): 10-20%, estrogen-independent, higher grade, worse prognosis. Risk factors: obesity, unopposed estrogen, PCOS, diabetes, Lynch syndrome, tamoxifen use. Protective factors: combined OCPs, progestin therapy, multiparity.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Amant F, et al. Endometrial cancer. Lancet. 2005;366(9484):491-505'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-004',
    question: 'A 55-year-old woman with Lynch syndrome (hereditary nonpolyposis colorectal cancer) has what lifetime risk of endometrial cancer?',
    options: [
      '5-10%',
      '20-30%',
      '40-60%',
      '70-80%'
    ],
    correctIndex: 2,
    explanation: 'Lynch syndrome: 40-60% lifetime endometrial cancer risk (higher than colorectal cancer risk in women). Caused by mismatch repair gene mutations (MLH1, MSH2, MSH6, PMS2). Presents at younger age (mean 48 years). Screening: endometrial biopsy annually starting age 30-35, or transvaginal ultrasound. Risk-reducing hysterectomy with bilateral salpingo-oophorectomy recommended after childbearing complete.',
    references: [
      'ACOG Practice Bulletin No. 147: Lynch Syndrome. Obstet Gynecol. 2014;124(6):1042-1054',
      'Lu KH, et al. Gynecologic cancer as a "sentinel cancer" for women with hereditary nonpolyposis colorectal cancer syndrome. Obstet Gynecol. 2005;105(3):569-574'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-005',
    question: 'A 28-year-old woman presents with acute onset severe right lower quadrant pain, nausea, and vomiting. Ultrasound shows enlarged right ovary with heterogeneous echotexture and absent Doppler flow. What is the diagnosis?',
    options: [
      'Appendicitis',
      'Ovarian torsion',
      'Ruptured ovarian cyst',
      'Ectopic pregnancy'
    ],
    correctIndex: 1,
    explanation: 'Ovarian torsion: surgical emergency. Classic presentation: sudden severe unilateral pelvic pain (often with nausea/vomiting), enlarged ovary (>5cm), absent or decreased Doppler flow (though presence of flow does NOT exclude torsion - dual blood supply). Risk factors: ovarian mass, pregnancy, ovulation induction. Treatment: urgent laparoscopy with detorsion ± cystectomy. Detorsion preferred over oophorectomy when possible (even if appears necrotic).',
    references: [
      'ACOG Committee Opinion No. 783: Adnexal Torsion in Adolescents. Obstet Gynecol. 2019;134(2):e56-e63',
      'Huchon C, et al. Adnexal torsion: a literature review. Eur J Obstet Gynecol Reprod Biol. 2010;150(1):8-12'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-006',
    question: 'What is the most common cause of acute pelvic pain in women of reproductive age?',
    options: [
      'Ectopic pregnancy',
      'Ovarian cyst rupture',
      'Pelvic inflammatory disease',
      'Appendicitis'
    ],
    correctIndex: 1,
    explanation: 'Ovarian cyst rupture/hemorrhage is most common cause of acute gynecologic pelvic pain. Functional cysts (follicular, corpus luteum) common and often rupture at ovulation or corpus luteum. Presents with sudden unilateral pain, may have peritoneal signs. Most resolve with conservative management. Significant hemoperitoneum may require surgery. Always rule out ectopic pregnancy in reproductive age women.',
    references: [
      'Bottomley C, Bourne T. Diagnosis and management of ovarian cyst accidents. Best Pract Res Clin Obstet Gynaecol. 2009;23(5):711-724',
      'Raziel A, et al. Current management of ruptured corpus luteum. Eur J Obstet Gynecol Reprod Biol. 1993;50(1):77-81'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-007',
    question: 'A 32-year-old woman presents with lower abdominal pain, fever (38.5°C), and cervical motion tenderness. What is the most appropriate initial treatment?',
    options: [
      'Observation only',
      'Single-dose ceftriaxone',
      'Ceftriaxone 250mg IM plus doxycycline 100mg PO BID for 14 days',
      'Emergency laparoscopy'
    ],
    correctIndex: 2,
    explanation: 'Pelvic inflammatory disease (PID) treatment: Outpatient - ceftriaxone 250-500mg IM single dose PLUS doxycycline 100mg PO BID x 14 days (± metronidazole 500mg PO BID x 14 days for BV coverage). Inpatient (severe, pregnancy, tubo-ovarian abscess, immunocompromised): cefoxitin or cefotetan IV + doxycycline. Early treatment prevents sequelae: infertility, ectopic pregnancy, chronic pelvic pain.',
    references: [
      'CDC. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187',
      'ACOG Practice Bulletin No. 194: Pelvic Inflammatory Disease. Obstet Gynecol. 2018;131(6):e157-e174'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-008',
    question: 'What is the Fitz-Hugh-Curtis syndrome?',
    options: [
      'Ovarian hyperstimulation syndrome',
      'Perihepatitis associated with PID',
      'Ruptured ectopic pregnancy',
      'Ovarian torsion with infarction'
    ],
    correctIndex: 1,
    explanation: 'Fitz-Hugh-Curtis syndrome: perihepatitis from PID (Chlamydia or Gonorrhea). Presents with right upper quadrant pain mimicking cholecystitis or hepatitis. Laparoscopy may show "violin string" adhesions between liver capsule and anterior abdominal wall. Diagnosis clinical or via imaging. Treatment: same as PID (ceftriaxone + doxycycline). Most resolve with antibiotics; adhesiolysis rarely needed.',
    references: [
      'Peter NG, et al. Fitz-Hugh-Curtis syndrome: a diagnosis to consider in women with right upper quadrant pain. Cleve Clin J Med. 2004;71(3):233-239',
      'ACOG Practice Bulletin No. 194: Pelvic Inflammatory Disease. Obstet Gynecol. 2018;131(6):e157-e174'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-009',
    question: 'A 45-year-old woman has endometrial biopsy showing complex atypical hyperplasia. What is the risk of concurrent endometrial cancer?',
    options: [
      '5-10%',
      '15-20%',
      '25-40%',
      '50-60%'
    ],
    correctIndex: 2,
    explanation: 'Complex atypical hyperplasia has 25-40% risk of concurrent endometrial cancer (found at hysterectomy). Also 25-30% progression risk if conservatively managed. Treatment: hysterectomy preferred (removes undiagnosed cancer, prevents progression). For fertility preservation: high-dose progestin therapy (megestrol, medroxyprogesterone, levonorgestrel IUD) with close surveillance (repeat biopsy q3-6 months). Simple hyperplasia without atypia: low cancer risk, can observe or treat with progestins.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Trimble CL, et al. Concurrent endometrial carcinoma in women with a biopsy diagnosis of atypical endometrial hyperplasia. Cancer. 2006;106(4):812-819'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-010',
    question: 'What is the most common symptom of endometrial cancer?',
    options: [
      'Pelvic pain',
      'Abnormal uterine bleeding',
      'Abdominal distension',
      'Weight loss'
    ],
    correctIndex: 1,
    explanation: 'Abnormal uterine bleeding (postmenopausal bleeding or irregular bleeding in premenopausal women) occurs in 90% of endometrial cancer cases. Early symptom leading to earlier diagnosis (most diagnosed at Stage I). Other symptoms: abnormal vaginal discharge, pelvic pain (advanced disease), palpable mass. Postmenopausal bleeding workup always includes endometrial sampling regardless of other findings.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Smith RA, et al. Cancer screening in the United States, 2019. CA Cancer J Clin. 2019;69(3):184-210'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-011',
    question: 'A 58-year-old woman on tamoxifen for breast cancer has an endometrial thickness of 8mm on ultrasound but no bleeding. What is the appropriate management?',
    options: [
      'No further evaluation needed',
      'Endometrial biopsy immediately',
      'Repeat ultrasound in 6 months',
      'Discontinue tamoxifen'
    ],
    correctIndex: 0,
    explanation: 'Tamoxifen causes endometrial thickening (stromal hypertrophy, polyps) without cancer. Screening asymptomatic women on tamoxifen NOT recommended - high false positive rate, low cancer detection. HOWEVER, any abnormal bleeding requires prompt endometrial sampling. Tamoxifen increases endometrial cancer risk 2-3x (still low absolute risk). Annual gynecologic exam recommended. Consider hysterectomy if symptomatic (bleeding, polyps).',
    references: [
      'ACOG Committee Opinion No. 601: Tamoxifen and Uterine Cancer. Obstet Gynecol. 2014;123(6):1394-1397',
      'Gerber B, et al. Endometrial safety during tamoxifen treatment. Gynecol Endocrinol. 2006;22(2):93-97'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-012',
    question: 'A 35-year-old woman presents with severe dysmenorrhea not responding to NSAIDs and OCPs. Physical exam shows uterosacral nodularity and fixed retroverted uterus. What is the likely diagnosis?',
    options: [
      'Adenomyosis',
      'Endometriosis',
      'Leiomyomas',
      'Chronic PID'
    ],
    correctIndex: 1,
    explanation: 'Endometriosis classic findings: progressive dysmenorrhea, dyspareunia, dyschezia, infertility. Exam: uterosacral nodularity, fixed retroverted uterus, adnexal masses (endometriomas). Definitive diagnosis requires laparoscopy with histology. Imaging (ultrasound/MRI) can identify endometriomas. Treatment: NSAIDs, combined OCPs, progestins, GnRH agonists, surgical excision/ablation. Adenomyosis: bulky tender uterus, heavy bleeding.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Giudice LC. Clinical practice. Endometriosis. N Engl J Med. 2010;362(25):2389-2398'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-013',
    question: 'What is the most common site of endometriosis?',
    options: [
      'Uterosacral ligaments',
      'Ovaries',
      'Cul-de-sac (pouch of Douglas)',
      'Bladder'
    ],
    correctIndex: 1,
    explanation: 'Ovaries are most common site (endometriomas/"chocolate cysts"). Other common sites: pelvic peritoneum, uterosacral ligaments, cul-de-sac, rectovaginal septum. Can occur anywhere in pelvis and rarely distant sites (lung, surgical scars). Revised American Society for Reproductive Medicine (rASRM) staging: Stage I-II (minimal-mild), Stage III-IV (moderate-severe). Stage does NOT correlate with pain severity.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Revised American Society for Reproductive Medicine classification of endometriosis: 1996. Fertil Steril. 1997;67(5):817-821'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-014',
    question: 'A 42-year-old woman presents with heavy menstrual bleeding and a 12-week-size uterus with multiple fibroids. Endometrial biopsy is benign. She desires definitive treatment. What is the most appropriate management?',
    options: [
      'Expectant management',
      'Hysterectomy',
      'Myomectomy',
      'Uterine artery embolization'
    ],
    correctIndex: 1,
    explanation: 'Hysterectomy provides definitive treatment for symptomatic fibroids when childbearing complete. Options: abdominal, vaginal, laparoscopic, robotic-assisted. Myomectomy preserves fertility but fibroids may recur. Uterine artery embolization (UAE): non-surgical option, preserves uterus, but potential fertility impact. Medical management (OCPs, progestins, GnRH agonists, tranexamic acid): temporizing or for mild symptoms. Shared decision-making essential.',
    references: [
      'ACOG Practice Bulletin No. 228: Management of Symptomatic Uterine Leiomyomas. Obstet Gynecol. 2021;137(6):e100-e115',
      'Stewart EA. Uterine fibroids. Lancet. 2001;357(9252):293-298'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-015',
    question: 'A 68-year-old woman presents with postmenopausal bleeding. Endometrial biopsy shows Grade 1 endometrioid adenocarcinoma. MRI shows disease confined to inner half of myometrium, no cervical involvement. What is the stage?',
    options: [
      'Stage IA',
      'Stage IB',
      'Stage II',
      'Stage IIIA'
    ],
    correctIndex: 0,
    explanation: 'FIGO 2009 Endometrial Cancer Staging: Stage IA - confined to endometrium or invades <50% myometrium. Stage IB - invades ≥50% myometrium. Stage II - cervical stromal invasion. Stage III - local/regional spread (adnexa, vagina, lymph nodes). Stage IV - bladder/bowel mucosa or distant metastases. Staging surgical (except Stage IV). Grade 1 (well-differentiated) has best prognosis.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Creasman W. Revised FIGO staging for carcinoma of the endometrium. Int J Gynaecol Obstet. 2009;105(2):109'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-016',
    question: 'What is the primary surgical treatment for early-stage endometrial cancer?',
    options: [
      'Hysterectomy alone',
      'Total hysterectomy with bilateral salpingo-oophorectomy',
      'Radical hysterectomy with lymphadenectomy',
      'Cone biopsy'
    ],
    correctIndex: 1,
    explanation: 'Standard surgical treatment: total hysterectomy (remove uterus and cervix) with bilateral salpingo-oophorectomy (remove tubes and ovaries - source of estrogen, potential metastatic site). Lymph node assessment (sentinel lymph node mapping or lymphadenectomy) based on risk factors. Minimally invasive approach (laparoscopic/robotic) preferred when feasible. Ovarian preservation may be considered in young women with low-grade, early-stage disease.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Walker JL, et al. Laparoscopy compared with laparotomy for comprehensive surgical staging of uterine cancer. Gynecol Oncol. 2009;112(3):405-410'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-017',
    question: 'A 52-year-old woman presents with a 6cm complex adnexal mass and elevated CA-125 (120 U/mL). What is the most appropriate next step?',
    options: [
      'Repeat CA-125 in 3 months',
      'Referral to gynecologic oncologist',
      'Simple cystectomy by general gynecologist',
      'Hormonal suppression therapy'
    ],
    correctIndex: 1,
    explanation: 'Adnexal mass concerning for malignancy (postmenopausal, large, complex, elevated CA-125) requires referral to gynecologic oncologist BEFORE surgery. Risk of Malignancy Index (RMI) uses menopausal status, ultrasound findings, CA-125. Appropriate staging/debulking at initial surgery improves outcomes. Oncologist can perform comprehensive staging (hysterectomy, BSO, omentectomy, lymphadenectomy, peritoneal biopsies) if cancer confirmed.',
    references: [
      'ACOG Practice Bulletin No. 174: Evaluation and Management of Adnexal Masses. Obstet Gynecol. 2016;128(5):e210-e226',
      'Jacobs I, et al. A risk of malignancy index incorporating CA 125, ultrasound and menopausal status. Br J Obstet Gynaecol. 1990;97(10):922-929'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-018',
    question: 'A 25-year-old woman with severe endometriosis desires fertility. What surgical approach is most appropriate?',
    options: [
      'Total hysterectomy with BSO',
      'Conservative surgery with excision/ablation of endometriosis',
      'Presacral neurectomy',
      'Bilateral oophorectomy'
    ],
    correctIndex: 1,
    explanation: 'Conservative surgery for endometriosis with fertility desire: excision or ablation of endometriotic lesions, adhesiolysis, cystectomy for endometriomas (preserve ovarian tissue). Restores anatomy, may improve fertility. Post-op: attempt conception naturally or with IVF (depending on factors). GnRH agonist or OCP suppression pre-op may be considered. Avoid bilateral oophorectomy (removes egg supply). Recurrence rate 20-40% at 5 years.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Vercellini P, et al. Surgery for endometriosis-associated infertility. Hum Reprod Update. 2009;15(4):441-461'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-019',
    question: 'What is the mechanism of action of GnRH agonists (leuprolide) in treating endometriosis?',
    options: [
      'Direct suppression of endometrial tissue',
      'Anti-inflammatory effects',
      'Hypoestrogenism from pituitary downregulation',
      'Immune system modulation'
    ],
    correctIndex: 2,
    explanation: 'GnRH agonists cause initial gonadotropin surge, then pituitary downregulation leading to hypogonadotropic hypogonadism and profound hypoestrogenism (medical "menopause"). Suppresses endometriotic implants. Side effects: hot flashes, bone loss, mood changes. Add-back therapy (low-dose estrogen-progestin) reduces side effects. Maximum duration typically 6 months (bone density concerns). Symptoms often recur after discontinuation.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Barbieri RL. Hormone treatment of endometriosis: the estrogen threshold hypothesis. Am J Obstet Gynecol. 1992;166(2):740-745'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-020',
    question: 'A 38-year-old woman presents with cyclic right lower quadrant pain occurring with menses. CT scan shows a 5cm cystic mass on the appendix. What is the likely diagnosis?',
    options: [
      'Appendicitis',
      'Ovarian endometrioma',
      'Appendiceal endometriosis',
      'Carcinoid tumor'
    ],
    correctIndex: 2,
    explanation: 'Appendiceal endometriosis: rare form of extrapelvic endometriosis. Presents with cyclic RLQ pain corresponding to menses. May mimic appendicitis. Other extrapelvic sites: bladder (cyclic hematuria), bowel (cyclic rectal bleeding, obstruction), lung (catamenial hemoptysis/pneumothorax), surgical scars (cyclic pain/bleeding). Treatment: surgical excision (appendectomy for appendiceal disease), hormonal suppression.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Gustofson RL, et al. Endometriosis and the appendix: a case series and comprehensive review of the literature. Fertil Steril. 2006;86(2):298-303'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-021',
    question: 'A 30-year-old woman with PID and tubo-ovarian abscess (5cm) has been on IV antibiotics for 48 hours without improvement. What is the next step?',
    options: [
      'Continue antibiotics for 7 more days',
      'Add antifungal therapy',
      'Image-guided drainage or surgical intervention',
      'Discharge on oral antibiotics'
    ],
    correctIndex: 2,
    explanation: 'Tubo-ovarian abscess (TOA) management: IV antibiotics (ampicillin/sulbactam, cefoxitin/cefotetan + doxycycline, or clindamycin + gentamicin). If no improvement in 48-72 hours OR rupture/peritonitis: drainage (image-guided percutaneous or surgical) or surgery (laparoscopy/laparotomy with drainage, salpingectomy, or oophorectomy). Ruptured TOA = surgical emergency requiring laparotomy, washout, broad-spectrum antibiotics.',
    references: [
      'ACOG Practice Bulletin No. 194: Pelvic Inflammatory Disease. Obstet Gynecol. 2018;131(6):e157-e174',
      'Landers DV, Sweet RL. Tubo-ovarian abscess: contemporary approach to management. Rev Infect Dis. 1983;5(5):876-884'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-022',
    question: 'What percentage of women with PID develop infertility?',
    options: [
      '1-5%',
      '10-20%',
      '30-40%',
      '50-60%'
    ],
    correctIndex: 1,
    explanation: 'PID causes tubal factor infertility in 10-20% of women after single episode. Risk increases with: multiple episodes (40% after 3+ episodes), delayed treatment, severity of infection. Other sequelae: ectopic pregnancy (6-10x increased risk), chronic pelvic pain (18-30%), recurrent PID. Early treatment crucial to prevent permanent damage. Annual Chlamydia screening recommended for sexually active women <25 years.',
    references: [
      'ACOG Practice Bulletin No. 194: Pelvic Inflammatory Disease. Obstet Gynecol. 2018;131(6):e157-e174',
      'Westrom L, et al. Pelvic inflammatory disease and fertility. Sex Transm Dis. 1992;19(4):185-192'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-023',
    question: 'A 48-year-old woman with heavy menstrual bleeding has hemoglobin 8.5 g/dL. Pelvic ultrasound shows multiple uterine fibroids. She desires uterine preservation. What medical therapy can reduce fibroid size and bleeding?',
    options: [
      'Combined oral contraceptives',
      'GnRH agonists',
      'Iron supplementation',
      'Vitamin D'
    ],
    correctIndex: 1,
    explanation: 'GnRH agonists (leuprolide, goserelin) shrink fibroids by 35-60% and reduce bleeding via hypoestrogenism. Used pre-operatively to improve anemia, facilitate surgery, or as temporizing therapy approaching menopause. Limit to 3-6 months (bone loss). Add-back therapy minimizes side effects. Other options: tranexamic acid (reduces bleeding, no size reduction), progestins (levonorgestrel IUD effective for bleeding). OCPs may worsen symptoms in some women.',
    references: [
      'ACOG Practice Bulletin No. 228: Management of Symptomatic Uterine Leiomyomas. Obstet Gynecol. 2021;137(6):e100-e115',
      'Lethaby A, et al. Pre-operative GnRH analogue therapy before hysterectomy or myomectomy for uterine fibroids. Cochrane Database Syst Rev. 2001;(2):CD000547'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-024',
    question: 'What is the most common location of uterine leiomyomas (fibroids)?',
    options: [
      'Submucosal',
      'Intramural',
      'Subserosal',
      'Pedunculated'
    ],
    correctIndex: 1,
    explanation: 'Intramural fibroids (within myometrium wall) are most common (70%). Submucosal (protrude into cavity): 5-10%, cause most bleeding symptoms. Subserosal (project outward): 20%, cause bulk symptoms, may torse if pedunculated. Classification: FIGO system 0-8. Submucous fibroids most symptomatic relative to size. Fibroids affect 70-80% of women by age 50; 25-50% symptomatic.',
    references: [
      'ACOG Practice Bulletin No. 228: Management of Symptomatic Uterine Leiomyomas. Obstet Gynecol. 2021;137(6):e100-e115',
      'Munro MG, et al. FIGO classification system for causes of abnormal uterine bleeding. Int J Gynaecol Obstet. 2011;113(1):3-13'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-025',
    question: 'A 72-year-old woman presents with vulvar pruritus and a white, thickened area on the vulva. Biopsy shows lichen sclerosus. What is the recommended treatment?',
    options: [
      'Observation only',
      'Topical estrogen',
      'High-potency topical corticosteroid (clobetasol)',
      'Surgical excision'
    ],
    correctIndex: 2,
    explanation: 'Lichen sclerosus treatment: high-potency topical corticosteroid (clobetasol 0.05% ointment) applied nightly until symptoms improve (4-12 weeks), then maintenance 2-3x/week indefinitely. Improves symptoms and architecture, may reduce (but not eliminate) vulvar cancer risk (4-5%). Follow-up for symptom recurrence or changes suggestive of malignancy. Biopsy required for diagnosis and to rule out VIN/cancer.',
    references: [
      'ACOG Committee Opinion No. 673: Persistent Vulvar Pain. Obstet Gynecol. 2016;128(3):e78-e84',
      'Kirtschig G, et al. Lichen sclerosus-presentation, diagnosis and management. Dtsch Arztebl Int. 2016;113(19):337-343'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-026',
    question: 'What is the risk of malignant transformation in lichen sclerosus?',
    options: [
      '<1%',
      '4-5%',
      '15-20%',
      '30-40%'
    ],
    correctIndex: 1,
    explanation: 'Lichen sclerosus has 4-5% lifetime risk of progression to vulvar squamous cell carcinoma. Requires long-term follow-up (annual exam, more frequent if symptomatic). Biopsy any suspicious areas: non-healing ulcers, nodules, pigmented lesions, warty areas. Treatment with corticosteroids improves symptoms but may not eliminate cancer risk. Patient education on self-examination important.',
    references: [
      'ACOG Committee Opinion No. 673: Persistent Vulvar Pain. Obstet Gynecol. 2016;128(3):e78-e84',
      'Jones RW, et al. Trends in squamous cell carcinoma of the vulva. Gynecol Oncol. 1997;74(2):229-235'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-027',
    question: 'A 55-year-old woman has CA-125 of 35 U/mL and a 4cm simple ovarian cyst on ultrasound. What is the appropriate management?',
    options: [
      'Immediate surgical removal',
      'Observation with repeat imaging in 6-12 weeks',
      'Start chemotherapy',
      'PET scan'
    ],
    correctIndex: 1,
    explanation: 'Simple cysts in postmenopausal women: Low risk if <10cm, simple (anechoic, thin-walled, no solid components), CA-125 normal. Management: observation with repeat ultrasound in 6-12 weeks. Many resolve spontaneously. Surgery if: enlarging, complex features develop, CA-125 elevated (>35 U/mL), or symptomatic. RMI score can help stratify risk. Premenopausal: simple cysts <5cm usually physiologic.',
    references: [
      'ACOG Practice Bulletin No. 174: Evaluation and Management of Adnexal Masses. Obstet Gynecol. 2016;128(5):e210-e226',
      'Greenlee RT, et al. Prevalence, incidence, and natural history of simple ovarian cysts among women >55 years old. Obstet Gynecol. 2010;116(6):1310-1315'
    ],
    difficulty: 'medium',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-028',
    question: 'Which finding on pelvic ultrasound is most concerning for ovarian malignancy?',
    options: [
      'Simple cyst <5cm',
      'Solid components with irregular borders and increased vascularity',
      'Corpus luteum cyst',
      'Thin septations'
    ],
    correctIndex: 1,
    explanation: 'Features concerning for malignancy: solid components, irregular/thick septations (>2-3mm), papillary projections, nodularity, bilateral masses, ascites, peritoneal implants, increased/abnormal vascularity on Doppler. Simple cysts (anechoic, thin-walled, no solid components) have low malignancy risk. Corpus luteum: physiologic, peripheral vascularity ("ring of fire"). Hemorrhagic cysts: internal echoes, septations (resolve over time).',
    references: [
      'ACOG Practice Bulletin No. 174: Evaluation and Management of Adnexal Masses. Obstet Gynecol. 2016;128(5):e210-e226',
      'Timmerman D, et al. Simple ultrasound rules to distinguish between benign and malignant adnexal masses. BMJ. 2016;353:i2239'
    ],
    difficulty: 'easy',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-029',
    question: 'A 40-year-old woman with chronic pelvic pain has diagnostic laparoscopy showing extensive pelvic adhesions but no visible endometriosis. What is the likely diagnosis?',
    options: [
      'Endometriosis cannot be the cause',
      'Microscopic endometriosis is still possible',
      'Adhesions from prior PID',
      'Normal finding'
    ],
    correctIndex: 2,
    explanation: 'Pelvic adhesions cause chronic pelvic pain. Causes: prior PID (most common), endometriosis, previous surgery, appendicitis. Adhesions may distort anatomy, cause bowel obstruction. However, no clear correlation between adhesion severity and pain intensity. Treatment: adhesiolysis (laparoscopic), though recurrence common (50-90%). Pain improvement variable (50-75%). Some advocate neurectomy or nerve blocks for refractory pain.',
    references: [
      'ACOG Practice Bulletin No. 51: Chronic Pelvic Pain. Obstet Gynecol. 2004;103(3):589-605',
      'Cheong Y, et al. Non-surgical interventions for the management of chronic pelvic pain. Cochrane Database Syst Rev. 2014;(3):CD008797'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  },
  {
    id: 'gpb-030',
    question: 'A 60-year-old woman with Stage IA Grade 1 endometrioid endometrial cancer undergoes hysterectomy and BSO. What is the recommended adjuvant therapy?',
    options: [
      'Chemotherapy',
      'Radiation therapy',
      'Hormonal therapy',
      'Observation only'
    ],
    correctIndex: 3,
    explanation: 'Stage IA Grade 1 endometrial cancer has excellent prognosis (>95% 5-year survival). Observation alone appropriate after complete surgical staging. Adjuvant therapy (radiation, chemotherapy) reserved for higher-risk disease: Stage IB, Grade 2-3, deep myometrial invasion, cervical involvement, lymphovascular invasion, positive nodes, or high-risk histology (serous, clear cell). Vaginal brachytherapy may reduce vaginal recurrence in intermediate-risk patients.',
    references: [
      'ACOG Practice Bulletin No. 149: Endometrial Cancer. Obstet Gynecol. 2015;125(4):1006-1026',
      'Keys HM, et al. A phase III trial of surgery with or without adjunctive external pelvic radiation therapy in intermediate risk endometrial adenocarcinoma. Gynecol Oncol. 2004;92(3):744-751'
    ],
    difficulty: 'hard',
    topicId: 'gyn-pain-bleeding',
    category: 'gynecologic'
  }
];
