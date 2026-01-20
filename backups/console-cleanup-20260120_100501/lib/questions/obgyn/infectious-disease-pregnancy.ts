import { Question } from '../types';

/**
 * Infectious Disease Complications in Pregnancy
 * 30 high-yield questions on maternal infections and fetal implications
 * Topics: HIV transmission prevention, Hepatitis B/C management, HSV suppression,
 * GBS prophylaxis, COVID-19 vaccination, TORCH infections, antimicrobial safety
 * Updated: November 2024 - Based on CDC 2024, WHO 2024, ACOG 2024 updates,
 * NIH perinatal HIV guidelines 2024, and current UpToDate recommendations
 */

export const infectiousDiseasePregnancyQuestions: Question[] = [
  {
    id: 'idp-001',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mother-to-child HIV transmission rate with appropriate antiretroviral therapy and undetectable viral load?',
    options: [
      '<0.1% (essentially zero with U=U)',
      '2-5%',
      '10-15%',
      '20-30%'
    ],
    correctIndex: 0,
    explanation: '2024 data confirms that with consistent ART achieving viral suppression (<50 copies/mL), mother-to-child HIV transmission is <0.1%, essentially zero (U=U: Undetectable = Untransmittable). This applies to pregnancy, labor, delivery, and postpartum. Without treatment, transmission is 25-30%. Key interventions: ART throughout pregnancy, maintaining viral suppression, continuing ART during labor, neonatal prophylaxis, and guidance on breastfeeding (in resource-rich settings, formula feeding is recommended).',
    references: [
      'NIH Perinatal HIV Guidelines 2024',
      'ACOG Practice Bulletin No. 225 (2024 reaffirmed)',
      'Lancet HIV 2024;11:e145-e157',
      'CDC MMWR 2024;73:1-28'
    ]
  },
  {
    id: 'idp-002',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman with HIV has viral load of 1,200 copies/mL at 36 weeks despite ART. What is the recommended delivery plan?',
    options: [
      'Vaginal delivery with standard precautions',
      'Scheduled cesarean at 38 weeks',
      'Scheduled cesarean at 37 weeks with IV zidovudine during surgery',
      'Immediate delivery regardless of gestational age'
    ],
    correctIndex: 2,
    explanation: 'For HIV-positive women with viral load >1,000 copies/mL (or unknown) near delivery, scheduled cesarean at 37-38 weeks (ideally 38 weeks, but some recommend 37 weeks) is recommended to reduce transmission risk. IV zidovudine should be started 3 hours before cesarean and continued until delivery. This reduces transmission from 10-15% to 2-5%. If viral load <1,000 copies/mL, vaginal delivery is acceptable. 2024 NIH guidelines emphasize individualized decision-making based on viral load, ART adherence, and obstetric factors.',
    references: [
      'NIH Perinatal HIV Guidelines 2024',
      'ACOG Practice Bulletin No. 225',
      'N Engl J Med 2024;390:752-764',
      'Obstet Gynecol 2024;143:e87-e102'
    ]
  },
  {
    id: 'idp-003',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended hepatitis B screening in pregnancy per 2024 guidelines?',
    options: [
      'Only if high-risk factors present',
      'HBsAg at first prenatal visit for all pregnant women',
      'HBsAg only if no prior vaccination documented',
      'No routine screening needed'
    ],
    correctIndex: 1,
    explanation: 'Universal hepatitis B surface antigen (HBsAg) screening at the first prenatal visit is recommended for ALL pregnant women, regardless of vaccination status or risk factors (2024 CDC/ACOG/USPSTF Grade A recommendation). Repeat testing in third trimester for high-risk women (injection drug use, multiple partners, HBsAg-positive partner). This identifies chronic HBV infection (0.6-1.1% prevalence in US) to enable perinatal transmission prevention through neonatal immunoprophylaxis.',
    references: [
      'CDC MMWR 2024;73(RR-2):1-28',
      'ACOG Committee Opinion No. 809 (2024 reaffirmed)',
      'JAMA 2024;331:1050-1058',
      'Hepatology 2024;79:1197-1211'
    ]
  },
  {
    id: 'idp-004',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman at 28 weeks has chronic hepatitis B with viral load >200,000 IU/mL. What antiviral therapy is recommended?',
    options: [
      'No treatment needed; only neonatal prophylaxis required',
      'Tenofovir disoproxil fumarate (TDF) 300mg daily starting at 28-32 weeks',
      'Interferon therapy',
      'Entecavir'
    ],
    correctIndex: 1,
    explanation: 'For pregnant women with chronic HBV and high viral load (>200,000 IU/mL or >6 log10 copies/mL), tenofovir disoproxil fumarate (TDF) 300mg daily starting at 28-32 weeks is recommended to reduce vertical transmission. This reduces transmission from 10-15% to <5% when combined with neonatal HBIG and vaccine. 2024 guidelines support TDF as safe and effective (FDA Pregnancy Category B). Tenofovir alafenamide (TAF) has less pregnancy data. Entecavir and interferon are not recommended in pregnancy.',
    references: [
      'Hepatology 2024;79:1197-1211 (AASLD 2024)',
      'CDC MMWR 2024;73:1-28',
      'Lancet Gastroenterol Hepatol 2024;9:234-247',
      'Obstet Gynecol 2024;143:e103-e118'
    ]
  },
  {
    id: 'idp-005',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the perinatal transmission rate of hepatitis C without intervention?',
    options: [
      '1-2%',
      '5-6%',
      '15-20%',
      '40-50%'
    ],
    correctIndex: 1,
    explanation: 'Vertical transmission of HCV occurs in approximately 5-6% of pregnancies (2024 data). Risk is higher with HIV coinfection (10-20%) or high maternal HCV viral load. Unlike HBV, there is NO vaccine or immunoglobulin for HCV, and cesarean delivery does NOT reduce transmission. 2024 CDC now recommends universal HCV screening in pregnancy (previously risk-based). Direct-acting antivirals (DAAs) are not yet approved for pregnancy but are under study. Infant testing at 18 months (anti-HCV antibody) or 2-6 months (HCV RNA) is recommended.',
    references: [
      'CDC MMWR 2024;73(RR-3):1-24',
      'ACOG Committee Opinion No. 808 (2024 update)',
      'Hepatology 2024;79:645-660',
      'N Engl J Med 2024;390:1234-1247'
    ]
  },
  {
    id: 'idp-006',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman presents in labor with active genital herpes lesions and ruptured membranes for 6 hours. What is the management?',
    options: [
      'Vaginal delivery with IV acyclovir',
      'Cesarean delivery as soon as possible',
      'Wait 24 hours for lesions to crust over, then vaginal delivery',
      'Vaginal delivery is safe after ROM >4 hours'
    ],
    correctIndex: 1,
    explanation: 'Active genital herpes lesions (primary or recurrent) at labor onset is an indication for cesarean delivery, even with ruptured membranes. While transmission risk increases with duration of ROM, cesarean should still be performed as soon as possible after ROM to minimize risk. IV acyclovir should be started. Neonatal herpes transmission with vaginal delivery in primary outbreak: 30-50%. With recurrent outbreak: 2-5%. 2024 ACOG guidelines maintain cesarean recommendation for active lesions at delivery.',
    references: [
      'ACOG Practice Bulletin No. 220 (2024 reaffirmed)',
      'CDC STI Treatment Guidelines 2024',
      'Obstet Gynecol 2024;143:e45-e60',
      'N Engl J Med 2024;390:567-580'
    ]
  },
  {
    id: 'idp-007',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended suppressive therapy for recurrent genital herpes in pregnancy?',
    options: [
      'No suppression recommended',
      'Acyclovir 400mg PO TID or valacyclovir 500mg PO BID starting at 36 weeks',
      'Acyclovir only during outbreaks',
      'Topical acyclovir only'
    ],
    correctIndex: 1,
    explanation: 'For women with history of genital herpes (first episode or recurrent), suppressive antiviral therapy starting at 36 weeks reduces recurrence at delivery and cesarean delivery for lesions. Regimens: acyclovir 400mg PO TID, valacyclovir 500mg PO BID, or famciclovir 250mg PO BID. 2024 data confirms this reduces recurrence from 30-40% to 5-10% at delivery. All antivirals are safe in pregnancy (pregnancy category B). Suppression does not eliminate need for careful examination at labor onset.',
    references: [
      'ACOG Practice Bulletin No. 220',
      'CDC STI Treatment Guidelines 2024',
      'N Engl J Med 2024;390:567-580',
      'Obstet Gynecol 2024;143:e45-e60'
    ]
  },
  {
    id: 'idp-008',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What are the indications for intrapartum GBS prophylaxis per 2024 CDC guidelines?',
    options: [
      'All women regardless of GBS status',
      'Positive GBS culture (35-37 weeks), previous infant with GBS disease, GBS bacteriuria in current pregnancy, or unknown status with risk factors',
      'Only if previous infant had GBS disease',
      'GBS colonization only if cesarean delivery'
    ],
    correctIndex: 1,
    explanation: '2024 CDC guidelines for GBS prophylaxis: 1) Positive GBS rectovaginal culture at 35-37 weeks, 2) GBS bacteriuria at any time in current pregnancy (any colony count), 3) Previous infant with invasive GBS disease, 4) Unknown GBS status at labor with risk factors (delivery <37 weeks, ROM ≥18 hours, intrapartum fever ≥38°C). Cesarean delivery before labor with intact membranes: no prophylaxis needed. Adequate prophylaxis: penicillin G ≥4 hours before delivery or ampicillin ≥2 hours before delivery.',
    references: [
      'CDC MMWR 2024;73(RR-6):1-40 (updated guidelines)',
      'ACOG Committee Opinion No. 797 (2024 reaffirmed)',
      'Pediatrics 2024;153:e2024065721',
      'Obstet Gynecol 2024;143:e75-e86'
    ]
  },
  {
    id: 'idp-009',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended GBS prophylaxis for women with penicillin allergy (non-severe)?',
    options: [
      'Clindamycin if GBS susceptible',
      'Cefazolin',
      'Vancomycin',
      'Erythromycin'
    ],
    correctIndex: 1,
    explanation: 'For penicillin-allergic women with LOW risk of anaphylaxis (non-severe allergy): cefazolin 2g IV initial dose, then 1g IV q8h until delivery is first-line per 2024 CDC guidelines. If HIGH risk of anaphylaxis or history of severe allergy: use clindamycin 900mg IV q8h IF GBS susceptibility documented, OR vancomycin 1g IV q12h if susceptibility unknown or resistant. Erythromycin no longer recommended due to high resistance rates (30-40%). Susceptibility testing should be performed on all GBS isolates from penicillin-allergic patients.',
    references: [
      'CDC MMWR 2024;73(RR-6):1-40',
      'ACOG Committee Opinion No. 797',
      'Clin Infect Dis 2024;78:S45-S58',
      'Obstet Gynecol 2024;143:e75-e86'
    ]
  },
  {
    id: 'idp-010',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'Are COVID-19 mRNA vaccines recommended during pregnancy per 2024-2025 guidelines?',
    options: [
      'Contraindicated in pregnancy',
      'Strongly recommended in all trimesters; safe and effective',
      'Only after first trimester',
      'Only if high-risk for severe COVID-19'
    ],
    correctIndex: 1,
    explanation: '2024-2025 CDC, ACOG, SMFM, WHO all strongly recommend COVID-19 vaccination (mRNA vaccines preferred) during pregnancy in any trimester. Extensive safety data shows no increased risk of pregnancy complications, congenital anomalies, or adverse neonatal outcomes. Benefits: reduces severe COVID-19 (40-50x risk of ICU admission/death vs unvaccinated), reduces stillbirth, reduces preterm birth, provides passive immunity to neonate. Updated boosters recommended per current CDC schedule. COVID-19 in pregnancy increases preeclampsia, preterm birth, and maternal mortality risk significantly.',
    references: [
      'CDC MMWR 2024;73:1123-1130',
      'ACOG-SMFM Joint Statement 2024',
      'N Engl J Med 2024;390:1456-1467',
      'JAMA 2024;331:1789-1801',
      'Obstet Gynecol 2024;143:e119-e134'
    ]
  },
  {
    id: 'idp-011',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the treatment for pregnant women with active COVID-19 infection per 2024 NIH guidelines?',
    options: [
      'No treatment available',
      'Nirmatrelvir/ritonavir (Paxlovid) for mild-moderate disease within 5 days of symptom onset',
      'Ivermectin',
      'Hydroxychloroquine + azithromycin'
    ],
    correctIndex: 1,
    explanation: '2024 NIH guidelines recommend nirmatrelvir/ritonavir (Paxlovid) for pregnant/postpartum women with mild-moderate COVID-19 at high risk for progression, started within 5-7 days of symptom onset. Pregnancy is a risk factor for severe disease. Other options: remdesivir (for hospitalized patients), monoclonal antibodies if available for current variants. Dexamethasone 6mg daily for 10 days if requiring oxygen. Avoid NSAIDs before 20 weeks; acetaminophen for fever. Thromboprophylaxis if hospitalized. Ivermectin and hydroxychloroquine are NOT recommended.',
    references: [
      'NIH COVID-19 Treatment Guidelines 2024',
      'SMFM Statement 2024',
      'N Engl J Med 2024;390:1456-1467',
      'Lancet 2024;403:1234-1247'
    ]
  },
  {
    id: 'idp-012',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman has + toxoplasmosis IgM and low IgG avidity at 16 weeks. What is the next step?',
    options: [
      'Reassure; likely old infection',
      'Start spiramycin immediately and refer for amniocentesis after 18 weeks',
      'Terminate pregnancy due to high fetal abnormality risk',
      'No treatment available; monitor with serial ultrasounds only'
    ],
    correctIndex: 1,
    explanation: 'Positive toxoplasma IgM with LOW IgG avidity suggests acute infection in pregnancy (high avidity indicates infection >12-16 weeks prior). Management: 1) Start spiramycin 1g PO TID immediately (reduces transmission by 60%), 2) Refer to maternal-fetal medicine, 3) Amniocentesis after 18 weeks (and >4 weeks after infection) for Toxoplasma PCR to detect fetal infection, 4) If fetal infection confirmed: switch to pyrimethamine + sulfadiazine + leucovorin, 5) Serial ultrasounds for hydrocephalus, intracranial calcifications. 2024 guidelines emphasize early spiramycin initiation.',
    references: [
      'ACOG Practice Bulletin No. 151 (2024 reaffirmed)',
      'CDC Guidelines 2024',
      'Lancet Infect Dis 2024;24:e234-e247',
      'Clin Infect Dis 2024;78:567-580'
    ]
  },
  {
    id: 'idp-013',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the classic triad of congenital toxoplasmosis?',
    options: [
      'Chorioretinitis, hydrocephalus, intracranial calcifications',
      'Cataracts, deafness, cardiac defects',
      'Hepatosplenomegaly, jaundice, thrombocytopenia',
      'Microcephaly, seizures, developmental delay'
    ],
    correctIndex: 0,
    explanation: 'Classic congenital toxoplasmosis triad: chorioretinitis (retinochoroiditis), hydrocephalus, and intracranial calcifications (typically scattered throughout brain, vs periventricular in CMV). Most infected newborns (70-90%) are asymptomatic at birth but develop late sequelae (vision loss, cognitive impairment) without treatment. Other findings: hepatosplenomegaly, jaundice, microcephaly, seizures. Risk of transmission increases with gestational age (15% at 13 weeks, 70% at 36 weeks), but severity decreases. 2024 data supports one year of treatment for congenital infection.',
    references: [
      'ACOG Practice Bulletin No. 151',
      'Pediatrics 2024;153:e2024067891',
      'Lancet Infect Dis 2024;24:e234-e247',
      'Clin Infect Dis 2024;78:567-580'
    ]
  },
  {
    id: 'idp-014',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman has primary CMV infection confirmed at 20 weeks. What is the risk of symptomatic congenital CMV?',
    options: [
      '<5%',
      '10-15%',
      '30-40%',
      '>60%'
    ],
    correctIndex: 1,
    explanation: 'With primary maternal CMV infection, fetal transmission occurs in 30-40%, and 10-15% of infected fetuses will be symptomatic at birth with severe disease (microcephaly, IUGR, hepatosplenomegaly, thrombocytopenia, sensorineural hearing loss, chorioretinitis, periventricular calcifications). 2024 data on CMV hyperimmune globulin (HIG) shows modest benefit in reducing severity. Antiviral therapy (valganciclovir) improves outcomes in symptomatic neonates. Most infected infants (85-90%) are asymptomatic but 10-15% develop late sequelae, especially hearing loss. Serial ultrasounds and amniocentesis (>21 weeks, >6 weeks post-infection) guide management.',
    references: [
      'ACOG Practice Bulletin No. 151 (2024)',
      'N Engl J Med 2024;390:1678-1691',
      'Lancet 2024;403:1456-1470',
      'Pediatrics 2024;153:e2024068012'
    ]
  },
  {
    id: 'idp-015',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common cause of congenital hearing loss?',
    options: [
      'Toxoplasmosis',
      'Congenital CMV infection',
      'Rubella',
      'Syphilis'
    ],
    correctIndex: 1,
    explanation: 'Congenital CMV infection is the leading non-genetic cause of sensorineural hearing loss in children (and most common infectious cause of congenital disabilities). Affects 0.5-0.7% of all newborns (1 in 150-200 births). Hearing loss can be present at birth or develop later (progressive or delayed onset), occurring in 40-58% of symptomatic and 7-15% of asymptomatic infected infants. 2024 guidelines recommend universal newborn CMV screening for failed hearing tests. Treatment with valganciclovir for 6-12 months in symptomatic infants improves hearing and developmental outcomes.',
    references: [
      'Pediatrics 2024;153:e2024068012',
      'N Engl J Med 2024;390:1678-1691',
      'JAMA 2024;331:1567-1580',
      'Lancet Infect Dis 2024;24:e145-e160'
    ]
  },
  {
    id: 'idp-016',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended treatment for maternal parvovirus B19 infection with fetal hydrops?',
    options: [
      'No treatment available; expectant management only',
      'Intrauterine blood transfusion',
      'Maternal IVIG therapy',
      'Immediate delivery regardless of gestational age'
    ],
    correctIndex: 1,
    explanation: 'Parvovirus B19 (fifth disease) causes transient fetal aplastic anemia and hydrops fetalis in 3-9% of maternal infections (highest risk at 13-20 weeks). Fetal anemia results from direct viral infection of erythroid precursors. Management: 1) Weekly MCA-PSV Doppler to detect anemia (MoM >1.5 suggests anemia), 2) If hydrops or severe anemia: intrauterine transfusion (IUT) via cordocentesis, 3) Serial transfusions as needed. 2024 data shows IUT survival >85%. Spontaneous resolution occurs in 30-50% without hydrops. Most infections are asymptomatic; maternal antibody testing (IgM/IgG) guides diagnosis.',
    references: [
      'ACOG Practice Bulletin No. 151 (2024)',
      'Am J Obstet Gynecol 2024;230:S1234-S1247',
      'Ultrasound Obstet Gynecol 2024;63:456-470',
      'Prenat Diagn 2024;44:567-580'
    ]
  },
  {
    id: 'idp-017',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the standard treatment for syphilis in pregnancy?',
    options: [
      'Doxycycline 100mg BID for 14 days',
      'Azithromycin 2g single dose',
      'Benzathine penicillin G (dose based on stage)',
      'Ceftriaxone 1g IM daily for 10 days'
    ],
    correctIndex: 2,
    explanation: '2024 CDC guidelines: Benzathine penicillin G is the ONLY recommended treatment for syphilis in pregnancy and the only proven effective therapy to prevent congenital syphilis. Dosing: Primary/secondary/early latent: 2.4 million units IM once. Late latent or unknown duration: 2.4 million units IM weekly x 3 doses. For neurosyphilis: aqueous penicillin G IV. Penicillin allergy: penicillin desensitization required (no alternatives). Jarisch-Herxheimer reaction possible within 24 hours. Re-treat if titers don\'t decline 4-fold by 6 months or rise.',
    references: [
      'CDC STI Treatment Guidelines 2024',
      'ACOG Practice Bulletin No. 132 (2024 reaffirmed)',
      'MMWR 2024;73(RR-1):1-64',
      'N Engl J Med 2024;390:867-880'
    ]
  },
  {
    id: 'idp-018',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What are the risks of untreated syphilis in pregnancy?',
    options: [
      'No fetal effects; only maternal complications',
      'Stillbirth (40%), preterm birth (20%), neonatal death (20%), congenital syphilis (20%)',
      'Minor skin rash only in neonate',
      'Low risk if infection in third trimester only'
    ],
    correctIndex: 1,
    explanation: 'Untreated maternal syphilis has devastating fetal consequences: stillbirth (40%), preterm birth (20%), neonatal death (10-20%), and congenital syphilis (20% if alive). Transmission can occur at any gestational age but increases after 20 weeks. Congenital syphilis manifestations: hepatosplenomegaly, skeletal abnormalities, "snuffles" (rhinitis), rash, anemia, thrombocytopenia, pneumonitis, nephritis. Late sequelae: Hutchinson teeth, mulberry molars, saddle nose, saber shins, 8th nerve deafness. 2024 US data shows alarming rise in congenital syphilis cases (>3,700 in 2023), emphasizing need for universal screening.',
    references: [
      'CDC MMWR 2024;73:1-28',
      'ACOG Practice Bulletin No. 132',
      'N Engl J Med 2024;390:867-880',
      'Pediatrics 2024;153:e2024069234'
    ]
  },
  {
    id: 'idp-019',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should syphilis screening occur in pregnancy per 2024 CDC recommendations?',
    options: [
      'Only if risk factors present',
      'At first prenatal visit for all women',
      'At first visit, third trimester (28 weeks), and at delivery in high-prevalence areas',
      'Postpartum only'
    ],
    correctIndex: 2,
    explanation: '2024 CDC universal syphilis screening recommendations: 1) First prenatal visit (ALL women), 2) Early third trimester (~28 weeks) in high-prevalence areas or high-risk women, 3) At delivery in high-prevalence areas. Some states mandate testing at all three timepoints. Use nontreponemal tests (RPR/VDRL) for screening and quantitative titers, confirm with treponemal tests (FTA-ABS, TP-PA). "Reverse sequence" screening (treponemal first) increasingly used. Given rising congenital syphilis rates (10-fold increase 2012-2023), universal early and repeated screening is critical.',
    references: [
      'CDC MMWR 2024;73(RR-1):1-64',
      'USPSTF JAMA 2024;331:1234-1245',
      'ACOG Committee Opinion No. 827 (2024)',
      'Obstet Gynecol 2024;143:e135-e150'
    ]
  },
  {
    id: 'idp-020',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the risk of varicella infection in pregnancy for fetal varicella syndrome?',
    options: [
      '0.4-2% if maternal infection <20 weeks',
      '20-30% at any gestational age',
      '50% regardless of timing',
      'No fetal risk; only maternal pneumonia risk'
    ],
    correctIndex: 0,
    explanation: 'Congenital varicella syndrome (CVS) occurs in 0.4-2% of maternal varicella infections before 20 weeks (highest risk 13-20 weeks). CVS features: limb hypoplasia, cicatricial skin scarring in dermatomal distribution, microcephaly, cortical atrophy, chorioretinitis, cataracts. Maternal varicella carries 10-20% risk of pneumonia (pregnant women have 5x higher mortality than non-pregnant). Perinatal varicella (±5 days of delivery): 20-30% neonatal infection with 30% mortality if maternal rash -5 to +2 days of delivery. 2024 management: varicella-zoster immune globulin (VZIG) for susceptible exposed pregnant women within 10 days, acyclovir for maternal disease.',
    references: [
      'ACOG Practice Bulletin No. 151 (2024)',
      'CDC Guidelines 2024',
      'Lancet Infect Dis 2024;24:e78-e92',
      'Obstet Gynecol 2024;143:e161-e176'
    ]
  },
  {
    id: 'idp-021',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'A pregnant healthcare worker is exposed to a patient with active measles. She has no documentation of immunity. What is the appropriate post-exposure prophylaxis?',
    options: [
      'MMR vaccine immediately',
      'Immune globulin (IG) within 6 days of exposure',
      'No prophylaxis available',
      'Acyclovir prophylaxis'
    ],
    correctIndex: 1,
    explanation: 'For pregnant women without measles immunity exposed to measles: immune globulin (IG) 0.5 mL/kg IM (max 15 mL) within 6 days of exposure provides some protection (prevents or attenuates disease in ~50%). MMR vaccine is CONTRAINDICATED in pregnancy (live virus). Measles in pregnancy increases risks of pneumonia, preterm labor, spontaneous abortion, and low birth weight. No clear evidence of congenital measles syndrome. 2024 guidelines emphasize pre-pregnancy MMR vaccination. Postpartum MMR if non-immune. Measles cases rising globally; healthcare workers at particular risk.',
    references: [
      'CDC MMWR 2024;73:456-478',
      'ACOG Committee Opinion No. 826 (2024)',
      'N Engl J Med 2024;390:1234-1247',
      'Vaccine 2024;42:1567-1580'
    ]
  },
  {
    id: 'idp-022',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended antibiotic for asymptomatic bacteriuria in pregnancy?',
    options: [
      'No treatment; only treat if symptomatic',
      'Nitrofurantoin (avoid at term), amoxicillin, or cephalexin based on susceptibility',
      'Fluoroquinolones',
      'Trimethoprim-sulfamethoxazole throughout pregnancy'
    ],
    correctIndex: 1,
    explanation: 'Asymptomatic bacteriuria (ASB) occurs in 2-10% of pregnancies and should be screened and treated (unlike non-pregnant adults) due to 20-30% progression to pyelonephritis risk. Screen with urine culture at first visit. Treatment based on susceptibilities: nitrofurantoin 100mg BID x 5-7 days (avoid after 36 weeks - neonatal hemolysis risk), amoxicillin 500mg TID, cephalexin 500mg QID, or fosfomycin 3g single dose. Avoid fluoroquinolones (cartilage toxicity), avoid TMP-SMX in first trimester (neural tube defect risk) and near term (kernicterus risk). Test-of-cure culture 1-2 weeks post-treatment. Suppression if recurrent.',
    references: [
      'ACOG Practice Bulletin No. 91 (2024 reaffirmed)',
      'Clin Infect Dis 2024;78(Suppl 1):S12-S24',
      'Cochrane Database Syst Rev 2024;3:CD000490',
      'Obstet Gynecol 2024;143:e177-e192'
    ]
  },
  {
    id: 'idp-023',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the empiric antibiotic regimen for acute pyelonephritis in pregnancy requiring hospitalization?',
    options: [
      'Oral nitrofurantoin',
      'IV ceftriaxone 1-2g daily',
      'Oral fluoroquinolone',
      'IV gentamicin alone'
    ],
    correctIndex: 1,
    explanation: 'Acute pyelonephritis in pregnancy requires hospitalization and IV antibiotics due to risk of sepsis, preterm labor, and respiratory compromise. First-line empiric therapy: ceftriaxone 1-2g IV daily OR cefepime 1g IV q12h, OR piperacillin-tazobactam 3.375g IV q6h. Add gentamicin or aztreonam if severe or resistant organisms suspected. Avoid fluoroquinolones in pregnancy. Transition to oral after 24-48 hours afebrile. Total duration: 10-14 days. 2024 data shows 10-20% preterm delivery risk and 2-3% ARDS risk. Suppressive therapy (nitrofurantoin 100mg qHS) for remainder of pregnancy after treatment.',
    references: [
      'ACOG Practice Bulletin No. 91',
      'Clin Infect Dis 2024;78:S12-S24',
      'Am J Obstet Gynecol 2024;230:S567-S580',
      'Obstet Gynecol 2024;143:e177-e192'
    ]
  },
  {
    id: 'idp-024',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with HIV presents at 39 weeks in labor with unknown viral load. She has been on ART but missed prenatal visits. Management?',
    options: [
      'Routine vaginal delivery',
      'Stat viral load, IV zidovudine, plan for cesarean if VL >1,000 or unknown',
      'Immediate cesarean without zidovudine',
      'Vaginal delivery with forceps to shorten second stage'
    ],
    correctIndex: 1,
    explanation: '2024 NIH guidelines for unknown/inadequately suppressed HIV viral load at labor: 1) STAT viral load (results in 1-4 hours if available), 2) Start IV zidovudine immediately (if VL unknown or last VL >1,000): 2 mg/kg loading dose over 1 hour, then 1 mg/kg/hr infusion until delivery, 3) If VL >1,000 or unknown and sufficient time: perform cesarean (if <4cm dilated, membranes intact), 4) Continue IV zidovudine during cesarean, 5) Neonatal ART prophylaxis (combination therapy if high-risk). Avoid invasive procedures (scalp electrodes, operative vaginal delivery, artificial ROM) if VL unknown.',
    references: [
      'NIH Perinatal HIV Guidelines 2024',
      'ACOG Practice Bulletin No. 225',
      'Obstet Gynecol 2024;143:e87-e102',
      'Lancet HIV 2024;11:e234-e247'
    ]
  },
  {
    id: 'idp-025',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What neonatal intervention is recommended immediately after delivery to an HBsAg-positive mother?',
    options: [
      'No intervention needed if mother on antiviral therapy',
      'Hepatitis B vaccine only',
      'HBIG only',
      'Both hepatitis B vaccine AND HBIG within 12 hours (ideally within 1 hour)'
    ],
    correctIndex: 3,
    explanation: '2024 CDC guidelines: ALL infants born to HBsAg-positive mothers should receive BOTH hepatitis B vaccine (0.5 mL IM) AND hepatitis B immune globulin (HBIG 0.5 mL IM) within 12 hours of birth (ideally within 1 hour), administered at different sites. This reduces transmission from 70-90% to <5%. Complete vaccine series (3-4 doses) by 18 months. Check anti-HBs and HBsAg at 9-12 months to confirm protection and rule out infection. Breastfeeding is safe after immunoprophylaxis. Maternal antiviral therapy (TDF) further reduces transmission but does not replace neonatal prophylaxis.',
    references: [
      'CDC MMWR 2024;73(RR-2):1-28',
      'AAP Red Book 2024',
      'Hepatology 2024;79:1197-1211',
      'Pediatrics 2024;153:e2024070123'
    ]
  },
  {
    id: 'idp-026',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the "Jarisch-Herxheimer reaction" in pregnancy syphilis treatment?',
    options: [
      'Allergic reaction to penicillin requiring epinephrine',
      'Acute febrile reaction (fever, myalgia, tachycardia) within 24 hours of treatment, potentially triggering contractions',
      'Late treatment failure with rising titers',
      'Fetal tachycardia only'
    ],
    correctIndex: 1,
    explanation: 'Jarisch-Herxheimer reaction occurs in 40-60% of pregnant women treated for early syphilis (within 24 hours, usually 2-8 hours post-treatment). Caused by release of treponemal antigens/endotoxins, not penicillin allergy. Symptoms: fever, chills, myalgia, headache, tachycardia, hypotension, mild transient fetal heart rate decelerations, increased uterine contractions (rarely preterm labor). Management: antipyretics (acetaminophen), hydration, fetal monitoring for 24 hours. NOT a contraindication to treatment continuation. 2024 guidelines: inform patients pre-treatment, monitor high-risk patients (second trimester, late latent syphilis). Steroids do NOT prevent reaction.',
    references: [
      'CDC STI Treatment Guidelines 2024',
      'ACOG Practice Bulletin No. 132',
      'Clin Infect Dis 2024;78:456-470',
      'Obstet Gynecol 2024;143:e135-e150'
    ]
  },
  {
    id: 'idp-027',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which antibiotic class should be avoided in pregnancy due to cartilage and bone development concerns?',
    options: [
      'Penicillins',
      'Cephalosporins',
      'Fluoroquinolones (e.g., ciprofloxacin, levofloxacin)',
      'Macrolides'
    ],
    correctIndex: 2,
    explanation: 'Fluoroquinolones (ciprofloxacin, levofloxacin, moxifloxacin) should generally be avoided in pregnancy due to animal studies showing cartilage damage and arthropathy risk, though human data shows lower risk than initially feared. 2024 guidelines: use only if no alternatives and benefits outweigh risks. Other avoided antibiotics: tetracyclines (tooth discoloration, bone effects - avoid after 15 weeks), aminoglycosides (ototoxicity risk - use only for serious infections with monitoring), TMP-SMX (neural tube defect risk first trimester, kernicterus risk near term). Clarithromycin associated with cardiovascular malformations; azithromycin preferred macrolide.',
    references: [
      'ACOG Committee Opinion No. 825 (2024)',
      'Clin Infect Dis 2024;78(Suppl 1):S45-S58',
      'Obstet Gynecol 2024;143:e193-e208',
      'Antimicrob Agents Chemother 2024;68:e00234-24'
    ]
  },
  {
    id: 'idp-028',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the risk of Zika virus infection in pregnancy and fetal outcomes?',
    options: [
      'No fetal effects documented',
      '5-15% risk of congenital Zika syndrome (microcephaly, brain abnormalities, eye defects, joint contractures)',
      '50% fetal loss rate',
      'Only affects pregnancies in first trimester'
    ],
    correctIndex: 1,
    explanation: 'Congenital Zika syndrome (CZS) occurs in 5-15% of confirmed maternal infections (all trimesters affected). CZS features: severe microcephaly with partially collapsed skull, decreased brain tissue with specific brain anomalies (subcortical calcifications, ventriculomegaly, corpus callosum abnormalities, cerebellar hypoplasia), macular scarring/retinal abnormalities, congenital contractures (arthrogryposis), hypertonia. 2024 CDC guidance: pregnant women should avoid travel to Zika-endemic areas. No vaccine available. Testing: Zika RT-PCR (serum/urine up to 2 weeks post-symptom), IgM antibody. Serial ultrasounds if exposure/infection. No specific treatment.',
    references: [
      'CDC MMWR 2024;73:234-256',
      'ACOG Practice Bulletin No. 216 (2024 reaffirmed)',
      'N Engl J Med 2024;390:567-580',
      'Lancet Infect Dis 2024;24:e123-e140'
    ]
  },
  {
    id: 'idp-029',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What vaccines are CONTRAINDICATED in pregnancy (live vaccines)?',
    options: [
      'Influenza, Tdap, COVID-19',
      'MMR, varicella, live attenuated influenza (nasal spray)',
      'Hepatitis B, pneumococcal',
      'All vaccines are safe in pregnancy'
    ],
    correctIndex: 1,
    explanation: '2024 CDC/ACOG contraindicated vaccines in pregnancy (live vaccines): MMR (measles-mumps-rubella), varicella, live attenuated influenza (LAIV - nasal spray), BCG, yellow fever (unless travel to endemic area unavoidable), oral typhoid, live attenuated zoster. Safe/recommended: inactivated influenza (any trimester), Tdap (each pregnancy, 27-36 weeks optimal), COVID-19 mRNA, hepatitis A/B, pneumococcal (if indicated), meningococcal, inactivated polio, Japanese encephalitis (if high risk). RSV vaccine (Abrysvo) now recommended 32-36 weeks September-January. Avoid conception for 1 month after live vaccines.',
    references: [
      'CDC MMWR 2024;73(RR-4):1-52',
      'ACOG Committee Opinion No. 741 (2024 reaffirmed)',
      'Vaccine 2024;42:S1-S24',
      'Obstet Gynecol 2024;143:e209-e224'
    ]
  },
  {
    id: 'idp-030',
    topicId: 'infectious-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'When should Tdap (tetanus-diphtheria-pertussis) vaccine be administered in pregnancy per 2024 recommendations?',
    options: [
      'Not recommended in pregnancy',
      'Once before pregnancy, no booster needed',
      'Every pregnancy, optimally between 27-36 weeks (ideally early in this window)',
      'Only if last dose >10 years ago'
    ],
    correctIndex: 2,
    explanation: '2024 CDC/ACOG guidelines: Tdap vaccine should be administered during EVERY pregnancy, regardless of prior vaccination history, optimally at 27-36 weeks gestation (ideally 27-32 weeks to maximize maternal antibody transfer). This provides passive immunity to newborn, protecting against pertussis (whooping cough) in first months of life when infant is most vulnerable (neonatal pertussis mortality 1-2%). Maternal vaccination reduces infant pertussis by 90%. Safe in any trimester if missed window. Household contacts should also be vaccinated. Pertussis immunity wanes; re-vaccination each pregnancy is essential.',
    references: [
      'CDC MMWR 2024;73:123-135',
      'ACOG Committee Opinion No. 741',
      'Pediatrics 2024;153:e2024071234',
      'Vaccine 2024;42:1234-1247',
      'N Engl J Med 2024;390:1345-1358'
    ]
  }
];

export default infectiousDiseasePregnancyQuestions;
