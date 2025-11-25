import fs from 'fs';
import path from 'path';

const topics = [
  'Antepartum Hemorrhage (APH)',
  'Postpartum Hemorrhage (PPH)',
  'Chorioamnionitis',
  'Placenta Previa',
  'Placental Abruption',
  'Vasa Previa',
  'Uterine Rupture',
  'Pre-eclampsia',
  'PPROM',
  'Preterm Labour',
  'Cardiac Conditions in Pregnancy',
  'Asthma in Pregnancy',
  'Cardiac Arrest in Pregnancy'
];

const references = {
  dutta: "Dutta's Textbook of Obstetrics",
  acog: 'ACOG Guidelines'
};

const outputDir = path.join(__dirname, '../data/obgyn-questions');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

topics.forEach((topic) => {
  const questions = Array.from({ length: 30 }, (_, i) => ({
    id: `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${i + 1}`,
    topic,
    question: `Sample question ${i + 1} on ${topic}?`,
    options: [
      'Option A',
      'Option B',
      'Option C',
      'Option D'
    ],
    answer: 0,
    explanation: 'Sample explanation based on Dutta and ACOG.',
    reference: `${references.dutta}; ${references.acog}`
  }));

  const fileName = `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
  fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(questions, null, 2));
  console.log(`Generated ${fileName}`);
});

console.log('All OB/GYN question files generated!');
