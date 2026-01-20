import { Question } from './types';

export const mechanicalVentilationQuestions: Question[] = [
  {
    id: 'vent-001',
    question: 'What is the primary goal of mechanical ventilation in ARDS according to ARDSNet protocols?',
    options: [
      'Normalize arterial blood gases',
      'Minimize ventilator-induced lung injury',
      'Maximize oxygen delivery',
      'Maintain normal pH'
    ],
    correctIndex: 1,
    explanation: 'The primary goal in ARDS is to minimize ventilator-induced lung injury through lung-protective ventilation strategies. This includes low tidal volumes (6 ml/kg predicted body weight), plateau pressure <30 cmH2O, and appropriate PEEP levels.',
    references: [
      'ARDSNet. N Engl J Med 2000;342:1301-1308',
      'Brower RG, et al. N Engl J Med 2004;351:327-336'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-002',
    question: 'What tidal volume should be used for lung-protective ventilation in ARDS?',
    options: [
      '4 ml/kg predicted body weight',
      '6 ml/kg predicted body weight',
      '8 ml/kg predicted body weight',
      '10 ml/kg predicted body weight'
    ],
    correctIndex: 1,
    explanation: 'ARDSNet protocol recommends 6 ml/kg predicted body weight for lung-protective ventilation. This low tidal volume strategy significantly reduces mortality in ARDS patients compared to traditional 12 ml/kg volumes.',
    references: [
      'ARDSNet. N Engl J Med 2000;342:1301-1308',
      'Petrucci N, De Feo C. Cochrane Database Syst Rev 2013'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-003',
    question: 'What is the maximum acceptable plateau pressure in ARDS patients?',
    options: [
      '25 cmH2O',
      '30 cmH2O',
      '35 cmH2O',
      '40 cmH2O'
    ],
    correctIndex: 1,
    explanation: 'Plateau pressure should be kept ≤30 cmH2O to prevent barotrauma and volutrauma. Plateau pressure reflects alveolar pressure and is measured during an inspiratory hold maneuver.',
    references: [
      'ARDSNet. N Engl J Med 2000;342:1301-1308',
      'Amato MB, et al. N Engl J Med 1998;338:347-354'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-004',
    question: 'Which PEEP strategy has been shown to improve outcomes in moderate to severe ARDS?',
    options: [
      'Minimal PEEP (5 cmH2O)',
      'PEEP titrated to best compliance',
      'High PEEP according to FiO2/PEEP table',
      'PEEP set at 15 cmH2O for all patients'
    ],
    correctIndex: 2,
    explanation: 'High PEEP strategy using FiO2/PEEP tables has shown benefit in moderate to severe ARDS (P/F ratio <200). The strategy aims to optimize oxygenation while minimizing FiO2 toxicity.',
    references: [
      'Brower RG, et al. N Engl J Med 2004;351:327-336',
      'Meade MO, et al. JAMA 2008;299:637-645'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-005',
    question: 'What is the recommended respiratory rate range to maintain pH >7.30 in ARDS patients?',
    options: [
      '6-10 breaths/min',
      '10-15 breaths/min',
      '15-25 breaths/min',
      '25-35 breaths/min'
    ],
    correctIndex: 2,
    explanation: 'Respiratory rate should be adjusted between 15-25 breaths/min to maintain pH >7.30. Permissive hypercapnia is acceptable to avoid high plateau pressures and ventilator-induced lung injury.',
    references: [
      'ARDSNet. N Engl J Med 2000;342:1301-1308',
      'Hickling KG, et al. Crit Care Med 1994;22:1568-1578'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-006',
    question: 'Which ventilator mode provides the most consistent tidal volume delivery?',
    options: [
      'Pressure Control (PC)',
      'Volume Control (VC)',
      'Pressure Support (PS)',
      'Airway Pressure Release Ventilation (APRV)'
    ],
    correctIndex: 1,
    explanation: 'Volume Control mode delivers a set tidal volume regardless of airway pressures (within safety limits). This ensures consistent minute ventilation but may result in variable pressures with changing lung compliance.',
    references: [
      'Tobin MJ. Am J Respir Crit Care Med 2001;163:1059-1063',
      'Esteban A, et al. JAMA 2002;287:345-355'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-007',
    question: 'What is the primary advantage of Pressure Control ventilation over Volume Control?',
    options: [
      'Guaranteed tidal volume delivery',
      'Lower peak airway pressures',
      'Better patient synchrony',
      'Easier to set up'
    ],
    correctIndex: 1,
    explanation: 'Pressure Control ventilation typically results in lower peak airway pressures due to decelerating flow pattern. This may reduce the risk of barotrauma, though plateau pressures remain the key parameter for lung protection.',
    references: [
      'Rappaport SH, et al. Chest 1994;105:1407-1411',
      'Prella M, et al. Am J Respir Crit Care Med 2002;166:1082-1086'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-008',
    question: 'Which parameter is most important for monitoring ventilator-induced lung injury?',
    options: [
      'Peak inspiratory pressure',
      'Plateau pressure',
      'Mean airway pressure',
      'Driving pressure'
    ],
    correctIndex: 3,
    explanation: 'Driving pressure (plateau pressure minus PEEP) is increasingly recognized as the most important parameter for VILI. It represents the pressure gradient across the lung and correlates better with mortality than plateau pressure alone.',
    references: [
      'Amato MB, et al. N Engl J Med 2015;372:747-755',
      'Aoyama H, et al. Crit Care Med 2018;46:1992-2003'
    ],
    difficulty: 'hard',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-009',
    question: 'What is the recommended I:E ratio for most mechanically ventilated patients?',
    options: [
      '1:1',
      '1:2',
      '1:3',
      '2:1'
    ],
    correctIndex: 1,
    explanation: 'An I:E ratio of 1:2 is recommended for most patients, allowing adequate expiration time and preventing auto-PEEP. In COPD patients, longer expiratory times (1:3 or 1:4) may be needed.',
    references: [
      'Marini JJ, et al. Am J Respir Crit Care Med 2005;171:426-429',
      'Tuxen DV, et al. Am Rev Respir Dis 1987;136:872-879'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-010',
    question: 'Which clinical finding suggests the presence of auto-PEEP?',
    options: [
      'High peak inspiratory pressure',
      'Persistent expiratory flow at end-expiration',
      'Low plateau pressure',
      'Normal arterial blood gas'
    ],
    correctIndex: 1,
    explanation: 'Persistent expiratory flow at end-expiration on the ventilator waveform indicates incomplete exhalation and auto-PEEP formation. This is common in COPD and can cause hemodynamic compromise.',
    references: [
      'Pepe PE, et al. Am Rev Respir Dis 1982;126:166-170',
      'MacIntyre NR. Respir Care 2005;50:110-123'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-011',
    question: 'What is the most appropriate ventilator strategy for a patient with severe COPD exacerbation?',
    options: [
      'High PEEP (15 cmH2O) and low respiratory rate',
      'Low PEEP (0-5 cmH2O) and low respiratory rate',
      'High PEEP (15 cmH2O) and high respiratory rate',
      'Low PEEP (0-5 cmH2O) and high respiratory rate'
    ],
    correctIndex: 1,
    explanation: 'COPD patients need low PEEP (0-5 cmH2O) and low respiratory rate (10-12/min) to allow adequate expiration time and prevent auto-PEEP. Permissive hypercapnia is often necessary and well-tolerated.',
    references: [
      'Brochard L, et al. Am J Respir Crit Care Med 1995;152:1711-1718',
      'Tuxen DV, et al. Am Rev Respir Dis 1987;136:872-879'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-012',
    question: 'Which oxygenation target is recommended for most critically ill patients?',
    options: [
      'SpO2 88-92%',
      'SpO2 94-98%',
      'SpO2 >98%',
      'PaO2 >100 mmHg'
    ],
    correctIndex: 1,
    explanation: 'SpO2 94-98% is the recommended target for most critically ill patients. This avoids both hypoxemia and hyperoxemia, which has been associated with increased mortality in some studies.',
    references: [
      'Girardis M, et al. JAMA 2016;316:1583-1589',
      'Panwar R, et al. Crit Care Med 2016;44:1-10'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-013',
    question: 'What is the mechanism of benefit from prone positioning in ARDS?',
    options: [
      'Increased cardiac output',
      'Improved ventilation-perfusion matching',
      'Reduced work of breathing',
      'Decreased airway resistance'
    ],
    correctIndex: 1,
    explanation: 'Prone positioning improves ventilation-perfusion matching by recruiting collapsed posterior lung regions and reducing shunt. The PROSEVA trial showed mortality benefit in severe ARDS when used early and for prolonged periods (16+ hours).',
    references: [
      'Guerin C, et al. N Engl J Med 2013;368:2159-2168',
      'Richter T, et al. Am J Respir Crit Care Med 2005;172:271-279'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-014',
    question: 'Which criteria must be met for prone positioning in ARDS according to PROSEVA protocol?',
    options: [
      'P/F ratio <150, PEEP ≥5, FiO2 ≥60%',
      'P/F ratio <200, PEEP ≥8, FiO2 ≥80%',
      'P/F ratio <100, any PEEP, FiO2 100%',
      'P/F ratio <300, PEEP ≥10, FiO2 ≥40%'
    ],
    correctIndex: 0,
    explanation: 'PROSEVA trial criteria for prone positioning include P/F ratio <150, PEEP ≥5 cmH2O, and FiO2 ≥60%. Prone positioning should be initiated early (within 36 hours of ARDS onset) and continued for at least 16 hours.',
    references: [
      'Guerin C, et al. N Engl J Med 2013;368:2159-2168',
      'Munshi L, et al. JAMA 2017;318:1227-1236'
    ],
    difficulty: 'hard',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-015',
    question: 'What is the recommended weaning method for patients mechanically ventilated >24 hours?',
    options: [
      'T-piece trials',
      'Pressure support weaning',
      'Daily spontaneous breathing trials',
      'Synchronized intermittent mandatory ventilation (SIMV) weaning'
    ],
    correctIndex: 2,
    explanation: 'Daily spontaneous breathing trials (SBT) using T-piece or low-level pressure support (5-8 cmH2O) are recommended. SBTs help identify patients ready for extubation and reduce unnecessary prolonged ventilation.',
    references: [
      'Esteban A, et al. N Engl J Med 1995;332:345-350',
      'Boles JM, et al. Eur Respir J 2007;29:1033-1056'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-016',
    question: 'Which parameter best predicts successful extubation?',
    options: [
      'Rapid shallow breathing index (RSBI) <105',
      'Maximum inspiratory pressure <-20 cmH2O',
      'Vital capacity >10 ml/kg',
      'P/F ratio >200'
    ],
    correctIndex: 0,
    explanation: 'Rapid shallow breathing index (respiratory rate/tidal volume in L) <105 is the best single predictor of successful extubation. However, the decision should be based on multiple factors including mental status and airway protection.',
    references: [
      'Yang KL, et al. Chest 1991;99:1158-1161',
      'Meade M, et al. Crit Care Med 2001;29:677-682'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-017',
    question: 'What is the most common cause of ventilator-associated pneumonia (VAP)?',
    options: [
      'Aspiration of gastric contents',
      'Microaspiration of oropharyngeal secretions',
      'Hematogenous spread from other infections',
      'Contaminated ventilator circuits'
    ],
    correctIndex: 1,
    explanation: 'Microaspiration of oropharyngeal secretions containing pathogenic bacteria is the most common mechanism of VAP. This occurs around the endotracheal tube cuff and through biofilm formation.',
    references: [
      'Chastre J, et al. Am J Respir Crit Care Med 2002;165:867-903',
      'Kollef MH, et al. Ann Intern Med 2012;156:494-501'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-018',
    question: 'Which intervention has the strongest evidence for VAP prevention?',
    options: [
      'Daily sedation interruption',
      'Oral care with chlorhexidine',
      'Head of bed elevation to 30-45°',
      'Subglottic secretion drainage'
    ],
    correctIndex: 2,
    explanation: 'Head of bed elevation to 30-45° has the strongest evidence for VAP prevention as part of the ventilator bundle. It reduces aspiration of gastric and oropharyngeal secretions.',
    references: [
      'Drakulovic MB, et al. Lancet 1999;354:1851-1858',
      'Klompas M, et al. Infect Control Hosp Epidemiol 2014;35:915-936'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-019',
    question: 'What is the appropriate response to a high-pressure alarm during mechanical ventilation?',
    options: [
      'Increase the pressure limit setting',
      'Assess patient and ventilator system immediately',
      'Sedate the patient',
      'Switch to pressure control mode'
    ],
    correctIndex: 1,
    explanation: 'High-pressure alarms require immediate assessment for causes including pneumothorax, mucus plugging, patient-ventilator dyssynchrony, or equipment malfunction. Patient safety is the priority before adjusting settings.',
    references: [
      'Slutsky AS, et al. N Engl J Med 2013;369:2126-2136',
      'Hess DR. Respir Care 2004;49:1123-1134'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-020',
    question: 'Which neuromuscular blocking agent is preferred for ARDS patients requiring paralysis?',
    options: [
      'Succinylcholine',
      'Cisatracurium',
      'Rocuronium',
      'Vecuronium'
    ],
    correctIndex: 1,
    explanation: 'Cisatracurium is preferred for ARDS patients as it undergoes Hofmann elimination (non-organ dependent) and has no active metabolites. The ACURASYS trial showed potential benefit in early severe ARDS.',
    references: [
      'Papazian L, et al. N Engl J Med 2010;363:1107-1116',
      'Alhazzani W, et al. Intensive Care Med 2013;39:2105-2114'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-021',
    question: 'What is the primary indication for using inverse ratio ventilation (IRV)?',
    options: [
      'Severe hypoxemia refractory to conventional ventilation',
      'Facilitating weaning from mechanical ventilation',
      'Reducing work of breathing',
      'Improving patient comfort'
    ],
    correctIndex: 0,
    explanation: 'Inverse ratio ventilation (I:E ratio >1:1) is used for severe hypoxemia when conventional strategies fail. The prolonged inspiratory time increases mean airway pressure and may improve oxygenation, but requires sedation and often paralysis.',
    references: [
      'Marcy TW, et al. Chest 1991;100:494-504',
      'Lessard MR, et al. Am J Respir Crit Care Med 1994;149:1077-1083'
    ],
    difficulty: 'hard',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-022',
    question: 'Which ventilator setting adjustment is most appropriate for a patient with metabolic acidosis?',
    options: [
      'Increase FiO2',
      'Increase PEEP',
      'Increase respiratory rate',
      'Increase tidal volume'
    ],
    correctIndex: 2,
    explanation: 'Increasing respiratory rate increases minute ventilation and CO2 elimination, leading to respiratory compensation for metabolic acidosis by lowering PaCO2. This helps normalize pH while treating the underlying cause.',
    references: [
      'Madias NE, et al. N Engl J Med 2010;363:1377-1382',
      'Berend K, et al. Nephrol Dial Transplant 2013;28:1614-1621'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-023',
    question: 'What is the mechanism of airway pressure release ventilation (APRV)?',
    options: [
      'High-frequency oscillations with low tidal volumes',
      'High continuous pressure with brief releases',
      'Alternating positive and negative pressures',
      'Proportional pressure support based on effort'
    ],
    correctIndex: 1,
    explanation: 'APRV uses a high continuous pressure (P-high) for prolonged time with brief releases (T-low) to a lower pressure. This maintains alveolar recruitment while allowing spontaneous breathing, potentially improving V/Q matching.',
    references: [
      'Habashi NM. Crit Care Med 2005;33:S228-235',
      'Zhou Y, et al. Crit Care 2017;21:111'
    ],
    difficulty: 'hard',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-024',
    question: 'Which parameter indicates optimal PEEP titration in ARDS?',
    options: [
      'Maximum static compliance',
      'Minimum driving pressure',
      'Best oxygenation',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Optimal PEEP can be determined by multiple approaches: maximum static compliance, minimum driving pressure, or best oxygenation. Recent evidence suggests driving pressure may be the most important parameter for outcomes.',
    references: [
      'Amato MB, et al. N Engl J Med 2015;372:747-755',
      'Suarez-Sipmann F, et al. Crit Care Med 2007;35:1946-1952'
    ],
    difficulty: 'hard',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-025',
    question: 'What is the recommended approach for ventilating patients with acute brain injury?',
    options: [
      'Hyperventilation to PaCO2 25-30 mmHg',
      'Normocapnia (PaCO2 35-45 mmHg)',
      'Hypercapnia for neuroprotection',
      'Variable CO2 based on ICP'
    ],
    correctIndex: 1,
    explanation: 'Normocapnia (PaCO2 35-45 mmHg) is recommended for brain injury patients. Hyperventilation reduces cerebral blood flow and should only be used briefly for acute herniation. Prolonged hyperventilation can worsen outcomes.',
    references: [
      'Brain Trauma Foundation Guidelines 2016',
      'Bratton SL, et al. J Neurotrauma 2007;24:S7-13'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-026',
    question: 'Which factor most strongly predicts difficult weaning from mechanical ventilation?',
    options: [
      'Age >65 years',
      'Duration of ventilation >7 days',
      'Presence of heart failure',
      'High APACHE II score'
    ],
    correctIndex: 1,
    explanation: 'Duration of mechanical ventilation >7 days is the strongest predictor of difficult weaning. Prolonged ventilation leads to respiratory muscle weakness, making weaning more challenging and increasing complications.',
    references: [
      'Boles JM, et al. Eur Respir J 2007;29:1033-1056',
      'Funk GC, et al. Intensive Care Med 2010;36:1075-1083'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-027',
    question: 'What is the appropriate initial ventilator settings for a 70 kg male with acute lung injury?',
    options: [
      'VT 700 ml, PEEP 5, FiO2 100%',
      'VT 420 ml, PEEP 10, FiO2 60%',
      'VT 500 ml, PEEP 15, FiO2 40%',
      'VT 350 ml, PEEP 20, FiO2 80%'
    ],
    correctIndex: 1,
    explanation: 'For a 70 kg male with ALI/ARDS: VT = 6 ml/kg × 70 kg = 420 ml, PEEP 10-15 cmH2O based on severity, FiO2 to maintain SpO2 94-98%. This follows lung-protective ventilation principles.',
    references: [
      'ARDSNet. N Engl J Med 2000;342:1301-1308',
      'Fan E, et al. Am J Respir Crit Care Med 2017;195:1253-1263'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-028',
    question: 'Which mode of ventilation allows the most patient control over breathing pattern?',
    options: [
      'Assist Control (AC)',
      'Synchronized Intermittent Mandatory Ventilation (SIMV)',
      'Pressure Support Ventilation (PSV)',
      'Controlled Mechanical Ventilation (CMV)'
    ],
    correctIndex: 2,
    explanation: 'Pressure Support Ventilation (PSV) allows patients complete control over respiratory rate, inspiratory time, and tidal volume. The ventilator provides pressure support for each patient-triggered breath, promoting patient-ventilator synchrony.',
    references: [
      'MacIntyre NR. Chest 1986;90:857-864',
      'Brochard L, et al. Am J Respir Crit Care Med 1994;149:896-903'
    ],
    difficulty: 'easy',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-029',
    question: 'What is the most appropriate intervention for patient-ventilator dyssynchrony?',
    options: [
      'Increase sedation',
      'Optimize ventilator settings and comfort',
      'Initiate neuromuscular blockade',
      'Change to pressure control mode'
    ],
    correctIndex: 1,
    explanation: 'Patient-ventilator dyssynchrony should first be addressed by optimizing ventilator settings (trigger sensitivity, flow rate, inspiratory time) and ensuring patient comfort. Sedation should be minimized when possible.',
    references: [
      'Thille AW, et al. Am J Respir Crit Care Med 2006;174:851-857',
      'Barr J, et al. Crit Care Med 2013;41:263-306'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  },
  {
    id: 'vent-030',
    question: 'Which complication is most associated with prolonged mechanical ventilation?',
    options: [
      'Ventilator-associated pneumonia',
      'Barotrauma',
      'ICU-acquired weakness',
      'Oxygen toxicity'
    ],
    correctIndex: 2,
    explanation: 'ICU-acquired weakness (critical illness polyneuropathy and myopathy) is strongly associated with prolonged mechanical ventilation, affecting up to 50% of patients ventilated >7 days. It significantly impacts weaning and functional outcomes.',
    references: [
      'Hermans G, et al. Lancet Respir Med 2014;2:369-379',
      'Fan E, et al. N Engl J Med 2014;370:1626-1635'
    ],
    difficulty: 'medium',
    topicId: 'mechanical-ventilation'
  }
];