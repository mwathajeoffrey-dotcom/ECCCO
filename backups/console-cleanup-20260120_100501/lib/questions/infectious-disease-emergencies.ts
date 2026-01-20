import { Question } from './types';

export const infectiousDiseaseEmergenciesQuestions: Question[] = [
  {
    id: 'id-001',
    question: 'A patient presents with fever, headache, neck stiffness, and photophobia. Lumbar puncture shows 2,000 WBC/μL (90% neutrophils), glucose 25 mg/dL, protein 150 mg/dL. What is the most likely diagnosis?',
    options: [
      'Viral meningitis',
      'Bacterial meningitis',
      'Tuberculous meningitis',
      'Fungal meningitis'
    ],
    correctIndex: 1,
    explanation: 'Bacterial meningitis typically presents with high WBC count (>1,000/μL) with neutrophil predominance, low glucose (<40 mg/dL or CSF:serum ratio <0.4), and elevated protein (>100 mg/dL). Immediate antibiotic therapy is critical to prevent morbidity and mortality.',
    references: [
      'van de Beek D, et al. Clinical features and prognostic factors in adults with bacterial meningitis. N Engl J Med. 2004;351(18):1849-1859',
      'Tunkel AR, et al. 2017 Infectious Diseases Society of America\'s Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis'
    ],
    difficulty: 'easy',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-002',
    question: 'A 25-year-old presents with fever, headache, and a petechial rash on extremities. Blood pressure is 80/50 mmHg. What is the most likely diagnosis?',
    options: [
      'Viral meningitis',
      'Meningococcal meningitis',
      'Pneumococcal meningitis',
      'Subarachnoid hemorrhage'
    ],
    correctIndex: 1,
    explanation: 'Meningococcal meningitis classically presents with fever, headache, neck stiffness, and a petechial/purpuric rash, often with shock. The rash may progress rapidly and is a poor prognostic sign. Immediate antibiotic therapy and supportive care are essential.',
    references: [
      'Stephens DS, et al. Epidemic meningitis, meningococcaemia, and Neisseria meningitidis. Lancet. 2007;369(9580):2196-2210',
      'Heckenberg SG, et al. Clinical features, outcome, and meningococcal genotype in 258 adults with meningococcal meningitis'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-003',
    question: 'A patient with suspected bacterial meningitis has a contraindication to lumbar puncture due to signs of increased intracranial pressure. What is the most appropriate management?',
    options: [
      'Delay antibiotics until after LP',
      'Start antibiotics immediately without LP',
      'Perform CT scan first',
      'Give mannitol then LP'
    ],
    correctIndex: 1,
    explanation: 'When bacterial meningitis is suspected and LP is contraindicated or delayed, antibiotics should be started immediately. Blood cultures should be obtained first if possible, but antibiotic therapy should not be delayed. Even a few hours delay can worsen outcomes.',
    references: [
      'Tunkel AR, et al. 2004 Infectious Diseases Society of America\'s guidelines for the management of bacterial meningitis',
      'van de Beek D, et al. Community-acquired bacterial meningitis in adults'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-004',
    question: 'A patient presents with septic shock. Blood pressure is 70/40 mmHg despite 2L normal saline. What is the most appropriate next step?',
    options: [
      'Continue fluid resuscitation',
      'Start norepinephrine',
      'Start dopamine',
      'Start dobutamine'
    ],
    correctIndex: 1,
    explanation: 'Norepinephrine is the first-line vasopressor for septic shock according to Surviving Sepsis Campaign guidelines. It should be started when adequate fluid resuscitation (typically 30 mL/kg) fails to restore adequate blood pressure and organ perfusion.',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021',
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-005',
    question: 'A patient presents with fever, productive cough, and consolidation on chest X-ray. Sputum gram stain shows gram-positive diplococci. What is the most likely pathogen?',
    options: [
      'Streptococcus pneumoniae',
      'Staphylococcus aureus',
      'Haemophilus influenzae',
      'Klebsiella pneumoniae'
    ],
    correctIndex: 0,
    explanation: 'Streptococcus pneumoniae appears as gram-positive diplococci and is the most common cause of community-acquired pneumonia. It often presents with fever, productive cough, and lobar consolidation on chest imaging.',
    references: [
      'Metlay JP, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America',
      'Mandell LA, et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia'
    ],
    difficulty: 'easy',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-006',
    question: 'A patient with diabetes presents with fever, ear pain, and black necrotic tissue in the external auditory canal. What is the most likely diagnosis?',
    options: [
      'Otitis externa',
      'Malignant otitis externa',
      'Cholesteatoma',
      'Cerumen impaction'
    ],
    correctIndex: 1,
    explanation: 'Malignant (necrotizing) otitis externa is a severe infection, typically caused by Pseudomonas aeruginosa, that occurs mainly in diabetics and immunocompromised patients. It can extend to involve bone and soft tissues and has high morbidity if untreated.',
    references: [
      'Rubin Grandis J, et al. The changing face of malignant (necrotising) external otitis: clinical, radiological, and anatomic correlations',
      'Stevens SM, et al. Malignant otitis externa: a novel technique for measuring disease extent'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-007',
    question: 'A patient presents with fever, abdominal pain, and diarrhea after eating undercooked poultry. Blood cultures grow Salmonella species. What is the most appropriate treatment?',
    options: [
      'Ciprofloxacin',
      'Azithromycin',
      'Supportive care only',
      'Metronidazole'
    ],
    correctIndex: 0,
    explanation: 'Salmonella bacteremia requires antibiotic treatment, typically with fluoroquinolones (ciprofloxacin) or third-generation cephalosporins. Uncomplicated gastroenteritis may be treated supportively, but bacteremia indicates systemic infection requiring antimicrobial therapy.',
    references: [
      'Shane AL, et al. 2017 Infectious Diseases Society of America Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea',
      'Hohmann EL. Nontyphoidal salmonellosis. Clin Infect Dis. 2001;32(2):263-269'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-008',
    question: 'A patient presents with fever, right upper quadrant pain, and jaundice. Blood cultures grow E. coli. What is the most likely diagnosis?',
    options: [
      'Hepatitis A',
      'Cholangitis',
      'Cholecystitis',
      'Hepatic abscess'
    ],
    correctIndex: 1,
    explanation: 'Cholangitis (Charcot\'s triad: fever, jaundice, RUQ pain) with E. coli bacteremia suggests ascending biliary infection. This is a medical emergency requiring immediate antibiotics and urgent biliary drainage (ERCP or percutaneous drainage).',
    references: [
      'Kimura Y, et al. TG13 clinical severity grading for acute cholangitis (with videos)',
      'Kiriyama S, et al. TG13 guidelines for diagnosis and severity grading of acute cholangitis (with videos)'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-009',
    question: 'A patient presents with fever, altered mental status, and focal neurologic deficits. MRI shows ring-enhancing lesions. What is the most appropriate empiric treatment?',
    options: [
      'Ceftriaxone and vancomycin',
      'Acyclovir',
      'Vancomycin, ceftriaxone, and metronidazole',
      'Amphotericin B'
    ],
    correctIndex: 2,
    explanation: 'Ring-enhancing brain lesions suggest brain abscess. Empiric treatment includes coverage for streptococci, staphylococci, and anaerobes with vancomycin, a third-generation cephalosporin (ceftriaxone), and metronidazole. Surgical drainage may be needed.',
    references: [
      'Brouwer MC, et al. Clinical characteristics and outcome of brain abscess: systematic review and meta-analysis',
      'Tunkel AR, et al. Practice guidelines for the management of bacterial meningitis'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-010',
    question: 'A patient with endocarditis has new neurologic symptoms. What is the most likely complication?',
    options: [
      'Embolic stroke',
      'Hemorrhagic stroke',
      'Mycotic aneurysm',
      'Meningitis'
    ],
    correctIndex: 0,
    explanation: 'Embolic stroke is the most common neurologic complication of endocarditis, occurring in 15-30% of cases. It results from embolization of vegetations to cerebral vessels. Other complications include hemorrhagic stroke, mycotic aneurysms, and brain abscess.',
    references: [
      'Sonneville R, et al. Neurologic complications and outcomes of infective endocarditis in critically ill patients',
      'Thuny F, et al. Risk of embolism and death in infective endocarditis: prognostic value of echocardiography'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-011',
    question: 'A patient presents with fever, dyspnea, and new heart murmur. Blood cultures are positive for Staphylococcus aureus. What imaging study is most appropriate?',
    options: [
      'Chest X-ray',
      'CT chest',
      'Transthoracic echocardiogram',
      'Transesophageal echocardiogram'
    ],
    correctIndex: 3,
    explanation: 'Transesophageal echocardiogram (TEE) is more sensitive than transthoracic echo for detecting vegetations, especially in prosthetic valves and for complications like abscess. It should be performed in suspected endocarditis when TTE is negative or inadequate.',
    references: [
      'Habib G, et al. 2015 ESC Guidelines for the management of infective endocarditis',
      'Baddour LM, et al. Infective Endocarditis in Adults: Diagnosis, Antimicrobial Therapy, and Management of Complications'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-012',
    question: 'A patient presents with fever, headache, and confusion after camping. Examination shows eschar on the leg. What is the most likely diagnosis?',
    options: [
      'Lyme disease',
      'Rocky Mountain spotted fever',
      'Ehrlichiosis',
      'Tularemia'
    ],
    correctIndex: 1,
    explanation: 'Rocky Mountain spotted fever presents with fever, headache, and the characteristic rash starting on wrists/ankles. An eschar (black scab) at the tick bite site is more common in Mediterranean spotted fever but can occur in RMSF. Early doxycycline treatment is essential.',
    references: [
      'Biggs HM, et al. Diagnosis and Management of Tickborne Rickettsial Diseases: Rocky Mountain Spotted Fever and Other Spotted Fever Group Rickettsioses, Ehrlichioses, and Anaplasmosis',
      'Chapman AS, et al. Diagnosis and management of tickborne rickettsial diseases'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-013',
    question: 'A patient presents with fever, myalgia, and a "bull\'s-eye" rash after a tick bite. What is the most appropriate treatment?',
    options: [
      'Amoxicillin',
      'Doxycycline',
      'Azithromycin',
      'Cephalexin'
    ],
    correctIndex: 1,
    explanation: 'The "bull\'s-eye" rash (erythema migrans) is pathognomonic for Lyme disease. Doxycycline is the first-line treatment for early Lyme disease in adults. Alternative treatments include amoxicillin or cefuroxime, especially in children or pregnant women.',
    references: [
      'Wormser GP, et al. The clinical assessment, treatment, and prevention of Lyme disease, human granulocytic anaplasmosis, and babesiosis',
      'Steere AC, et al. Lyme disease. N Engl J Med. 2001;345(2):115-125'
    ],
    difficulty: 'easy',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-014',
    question: 'A patient presents with fever, severe headache, and a maculopapular rash starting on wrists and ankles. What laboratory finding supports the diagnosis?',
    options: [
      'Elevated white blood cell count',
      'Thrombocytopenia',
      'Elevated creatine kinase',
      'Positive blood cultures'
    ],
    correctIndex: 1,
    explanation: 'Rocky Mountain spotted fever commonly causes thrombocytopenia, along with hyponatremia and elevated liver enzymes. The classic triad of fever, headache, and rash occurs in only 60-70% of cases. Early treatment with doxycycline is crucial.',
    references: [
      'Biggs HM, et al. Diagnosis and Management of Tickborne Rickettsial Diseases',
      'Dalton MJ, et al. National surveillance for Rocky Mountain spotted fever, 1981-1992'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-015',
    question: 'A patient with HIV (CD4 50 cells/μL) presents with fever, dyspnea, and bilateral interstitial infiltrates. LDH is markedly elevated. What is the most likely diagnosis?',
    options: [
      'Bacterial pneumonia',
      'Pneumocystis pneumonia',
      'Cytomegalovirus pneumonia',
      'Tuberculosis'
    ],
    correctIndex: 1,
    explanation: 'Pneumocystis jirovecii pneumonia (PCP) typically occurs in HIV patients with CD4 <200 cells/μL. It presents with subacute dyspnea, dry cough, fever, and bilateral interstitial infiltrates. Markedly elevated LDH is characteristic.',
    references: [
      'Kaplan JE, et al. Guidelines for prevention and treatment of opportunistic infections in HIV-infected adults and adolescents',
      'Thomas CF Jr, et al. Pneumocystis pneumonia. N Engl J Med. 2004;350(24):2487-2498'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-016',
    question: 'A patient presents with cellulitis and drainage from a wound. Gram stain shows gram-positive cocci in clusters. The organism is resistant to methicillin. What is the most appropriate treatment?',
    options: [
      'Cephalexin',
      'Clindamycin',
      'Vancomycin',
      'Penicillin'
    ],
    correctIndex: 2,
    explanation: 'MRSA (methicillin-resistant Staphylococcus aureus) skin and soft tissue infections require anti-MRSA antibiotics. Vancomycin is the gold standard for serious MRSA infections. Oral alternatives include clindamycin, doxycycline, or trimethoprim-sulfamethoxazole for mild infections.',
    references: [
      'Liu C, et al. Clinical practice guidelines by the infectious diseases society of america for the treatment of methicillin-resistant Staphylococcus aureus infections in adults and children',
      'Stevens DL, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-017',
    question: 'A patient presents with necrotizing fasciitis. What is the most important immediate intervention?',
    options: [
      'Broad-spectrum antibiotics',
      'Surgical debridement',
      'Hyperbaric oxygen',
      'Corticosteroids'
    ],
    correctIndex: 1,
    explanation: 'Urgent surgical debridement is the most important intervention for necrotizing fasciitis. Time to surgery directly correlates with mortality. Broad-spectrum antibiotics are also essential but surgical intervention takes priority.',
    references: [
      'Stevens DL, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update',
      'Sarani B, et al. Necrotizing fasciitis: current concepts and review of the literature'
    ],
    difficulty: 'easy',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-018',
    question: 'A patient presents with fever, vomiting, and altered mental status. CSF shows lymphocytic pleocytosis, normal glucose, and mildly elevated protein. What is the most likely diagnosis?',
    options: [
      'Bacterial meningitis',
      'Viral meningitis',
      'Tuberculous meningitis',
      'Cryptococcal meningitis'
    ],
    correctIndex: 1,
    explanation: 'Viral meningitis typically presents with lymphocytic pleocytosis (>50% lymphocytes), normal or slightly low glucose, and mildly elevated protein (<100 mg/dL). Most cases are self-limited, but HSV encephalitis requires treatment with acyclovir.',
    references: [
      'Tunkel AR, et al. The management of encephalitis: clinical practice guidelines by the Infectious Diseases Society of America',
      'Logan SA, et al. Viral meningitis. BMJ. 2008;336(7634):36-40'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-019',
    question: 'A patient presents with fever, altered mental status, and temporal lobe changes on MRI. CSF PCR is positive for HSV. What is the treatment?',
    options: [
      'Acyclovir 10 mg/kg IV q8h',
      'Ganciclovir 5 mg/kg IV q12h',
      'Foscarnet 60 mg/kg IV q8h',
      'Ribavirin 15 mg/kg/day'
    ],
    correctIndex: 0,
    explanation: 'HSV encephalitis requires immediate treatment with high-dose acyclovir (10 mg/kg IV every 8 hours for 14-21 days). Early treatment improves outcomes significantly. The temporal lobe predilection is characteristic of HSV encephalitis.',
    references: [
      'Tunkel AR, et al. The management of encephalitis: clinical practice guidelines by the Infectious Diseases Society of America',
      'Whitley RJ, et al. Herpes simplex encephalitis: clinical assessment. Clin Infect Dis. 2006;43(5):554-561'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-020',
    question: 'A patient with prosthetic valve endocarditis has blood cultures positive for Enterococcus faecalis sensitive to ampicillin. What is the most appropriate treatment?',
    options: [
      'Ampicillin alone',
      'Vancomycin alone',
      'Ampicillin plus gentamicin',
      'Vancomycin plus gentamicin'
    ],
    correctIndex: 2,
    explanation: 'Enterococcal endocarditis, especially prosthetic valve endocarditis, requires combination therapy with a cell wall-active agent (ampicillin or vancomycin) plus an aminoglycoside (gentamicin) for synergy. Monotherapy is insufficient for serious enterococcal infections.',
    references: [
      'Baddour LM, et al. Infective Endocarditis in Adults: Diagnosis, Antimicrobial Therapy, and Management of Complications',
      'Habib G, et al. 2015 ESC Guidelines for the management of infective endocarditis'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-021',
    question: 'A patient presents with fever, flank pain, and costovertebral angle tenderness. Urine culture grows E. coli. What is the most appropriate initial treatment?',
    options: [
      'Oral ciprofloxacin',
      'Oral trimethoprim-sulfamethoxazole',
      'IV ceftriaxone',
      'Oral nitrofurantoin'
    ],
    correctIndex: 2,
    explanation: 'Acute pyelonephritis requires parenteral antibiotics initially, especially if the patient appears toxic or has systemic symptoms. IV ceftriaxone or fluoroquinolones are appropriate choices. Oral antibiotics can be used for mild cases or after clinical improvement.',
    references: [
      'Gupta K, et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women',
      'Colgan R, et al. Diagnosis and treatment of acute pyelonephritis in women'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-022',
    question: 'A patient with diabetes presents with fever, ear pain, and cranial nerve VII palsy. CT shows osteomyelitis of the temporal bone. What is the most likely pathogen?',
    options: [
      'Streptococcus pneumoniae',
      'Staphylococcus aureus',
      'Pseudomonas aeruginosa',
      'Aspergillus fumigatus'
    ],
    correctIndex: 2,
    explanation: 'Malignant otitis externa with skull base osteomyelitis and cranial nerve involvement is typically caused by Pseudomonas aeruginosa. It occurs mainly in diabetics and immunocompromised patients. Prolonged antipseudomonal antibiotics are required.',
    references: [
      'Rubin Grandis J, et al. The changing face of malignant (necrotising) external otitis',
      'Carfrae MJ, et al. Malignant otitis externa. Otolaryngol Clin North Am. 2008;41(3):537-549'
    ],
    difficulty: 'hard',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-023',
    question: 'A patient presents with fever, night sweats, and weight loss. Chest X-ray shows upper lobe cavitary lesions. Sputum acid-fast stain is positive. What is the most appropriate initial treatment?',
    options: [
      'Isoniazid and rifampin',
      'Isoniazid, rifampin, ethambutol, and pyrazinamide',
      'Fluoroquinolone',
      'Streptomycin alone'
    ],
    correctIndex: 1,
    explanation: 'Initial treatment for pulmonary tuberculosis consists of four drugs: isoniazid, rifampin, ethambutol, and pyrazinamide (RIPE) for 2 months, followed by isoniazid and rifampin for 4 more months. Four-drug therapy prevents resistance development.',
    references: [
      'Nahid P, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis',
      'World Health Organization. Guidelines for treatment of tuberculosis. 4th edition'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-024',
    question: 'A patient with neutropenia (ANC 200 cells/μL) presents with fever. Blood pressure is stable and patient appears well. What is the most appropriate management?',
    options: [
      'Oral antibiotics and outpatient follow-up',
      'Immediate IV broad-spectrum antibiotics',
      'Observation and serial blood cultures',
      'Antifungal therapy'
    ],
    correctIndex: 1,
    explanation: 'Febrile neutropenia is a medical emergency requiring immediate empiric broad-spectrum antibiotics, even if the patient appears well. Common regimens include antipseudomonal beta-lactams (cefepime, piperacillin-tazobactam, meropenem) with or without vancomycin.',
    references: [
      'Freifeld AG, et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer: 2010 update by the infectious diseases society of america',
      'Klastersky J, et al. Management of febrile neutropaenia: ESMO Clinical Practice Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-025',
    question: 'A patient presents with fever, productive cough, and bilateral lower lobe consolidation. Which pathogen is most commonly associated with this pattern?',
    options: [
      'Streptococcus pneumoniae',
      'Klebsiella pneumoniae',
      'Mycoplasma pneumoniae',
      'Legionella pneumophila'
    ],
    correctIndex: 1,
    explanation: 'Klebsiella pneumoniae classically causes bilateral lower lobe pneumonia with thick, bloody sputum ("currant jelly" sputum). It\'s more common in alcoholics, diabetics, and nursing home residents. S. pneumoniae typically causes lobar pneumonia.',
    references: [
      'Mandell LA, et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia',
      'File TM. Community-acquired pneumonia. Lancet. 2003;362(9400):1991-2001'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-026',
    question: 'A patient presents with gradual onset of fever, headache, and confusion over several weeks. CSF shows lymphocytic pleocytosis, low glucose (30 mg/dL), and high protein (200 mg/dL). What is the most likely diagnosis?',
    options: [
      'Viral meningitis',
      'Bacterial meningitis',
      'Tuberculous meningitis',
      'Cryptococcal meningitis'
    ],
    correctIndex: 2,
    explanation: 'Tuberculous meningitis presents with subacute onset over weeks, lymphocytic pleocytosis, low glucose, and markedly elevated protein. It has high morbidity and mortality if untreated. Four-drug anti-TB therapy plus corticosteroids are recommended.',
    references: [
      'Thwaites GE, et al. Tuberculous meningitis. J Neurol Neurosurg Psychiatry. 2000;68(3):289-299',
      'Nahid P, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-027',
    question: 'A patient with prosthetic joint infection has persistent positive cultures despite appropriate antibiotics. What is the most appropriate management?',
    options: [
      'Continue antibiotics for longer duration',
      'Change to different antibiotics',
      'Add rifampin to current regimen',
      'Surgical removal of prosthesis'
    ],
    correctIndex: 3,
    explanation: 'Prosthetic joint infections with persistent positive cultures or clinical failure typically require removal of the prosthesis for cure. Biofilm formation on foreign materials makes eradication with antibiotics alone very difficult. Two-stage revision is often necessary.',
    references: [
      'Osmon DR, et al. Diagnosis and management of prosthetic joint infection: clinical practice guidelines by the Infectious Diseases Society of America',
      'Zimmerli W, et al. Prosthetic-joint infections. N Engl J Med. 2004;351(16):1645-1654'
    ],
    difficulty: 'hard',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-028',
    question: 'A patient presents with fever, rigors, and back pain. MRI shows vertebral osteomyelitis. Blood cultures are positive for Staphylococcus aureus. What is the duration of antibiotic therapy?',
    options: [
      '2-4 weeks',
      '4-6 weeks',
      '6-8 weeks',
      '12 weeks'
    ],
    correctIndex: 2,
    explanation: 'Vertebral osteomyelitis requires prolonged antibiotic therapy, typically 6-8 weeks for S. aureus. IV therapy is preferred initially, but oral therapy with high bioavailability agents (fluoroquinolones, clindamycin) can be used after clinical improvement.',
    references: [
      'Berbari EF, et al. 2015 Infectious Diseases Society of America (IDSA) Clinical Practice Guidelines for the Diagnosis and Treatment of Native Vertebral Osteomyelitis in Adults',
      'Zimmerli W. Vertebral osteomyelitis. N Engl J Med. 2010;362(11):1022-1029'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-029',
    question: 'A patient with C. difficile colitis develops toxic megacolon. What is the most appropriate management?',
    options: [
      'Increase metronidazole dose',
      'Switch to oral vancomycin',
      'Add IV metronidazole to oral vancomycin',
      'Emergent colectomy'
    ],
    correctIndex: 3,
    explanation: 'Toxic megacolon is a life-threatening complication of C. difficile colitis requiring emergent surgical consultation and often colectomy. Medical management alone has poor outcomes. Early surgical intervention improves survival.',
    references: [
      'McDonald LC, et al. Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by the Infectious Diseases Society of America (IDSA) and Society for Healthcare Epidemiology of America (SHEA)',
      'Hall JF, et al. American Society of Colon and Rectal Surgeons practice parameters for the treatment of patients with dominantly fulminant Clostridium difficile colitis'
    ],
    difficulty: 'hard',
    topicId: 'infectious-disease-emergencies'
  },
  {
    id: 'id-030',
    question: 'A healthcare worker has a needle stick injury from an HIV-positive patient. What is the most appropriate post-exposure prophylaxis?',
    options: [
      'Zidovudine alone',
      'Zidovudine and lamivudine',
      'Tenofovir, emtricitabine, and raltegravir',
      'No prophylaxis needed'
    ],
    correctIndex: 2,
    explanation: 'Current HIV post-exposure prophylaxis recommendations include three-drug combination therapy, typically tenofovir/emtricitabine plus raltegravir or dolutegravir, started within 72 hours (preferably <2 hours) and continued for 28 days.',
    references: [
      'Kuhar DT, et al. Updated US Public Health Service guidelines for the management of occupational exposures to human immunodeficiency virus and recommendations for postexposure prophylaxis',
      'Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the use of antiretroviral agents in adults and adolescents with HIV'
    ],
    difficulty: 'medium',
    topicId: 'infectious-disease-emergencies'
  }
];