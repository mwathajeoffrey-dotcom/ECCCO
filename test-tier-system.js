// Test script to debug the tier system
const fs = require('fs');
const path = require('path');

// Read the tier system file content
const tierSystemPath = path.join(__dirname, 'src/lib/questions/oncologic-tier-system.ts');
const adultQuestionsPath = path.join(__dirname, 'src/lib/questions/adult-oncologic-emergencies.ts');
const pediatricQuestionsPath = path.join(__dirname, 'src/lib/questions/pediatric-oncologic-emergencies.ts');

console.log('Checking file existence:');
console.log('Tier system file exists:', fs.existsSync(tierSystemPath));
console.log('Adult questions file exists:', fs.existsSync(adultQuestionsPath));
console.log('Pediatric questions file exists:', fs.existsSync(pediatricQuestionsPath));

// Count the questions by checking the file content
try {
  const adultContent = fs.readFileSync(adultQuestionsPath, 'utf8');
  const pediatricContent = fs.readFileSync(pediatricQuestionsPath, 'utf8');
  
  // Count question objects (rough count by counting 'id:' patterns)
  const adultQuestionCount = (adultContent.match(/id:\s*['"`]/g) || []).length;
  const pediatricQuestionCount = (pediatricContent.match(/id:\s*['"`]/g) || []).length;
  
  console.log('\nQuestion counts (rough):');
  console.log('Adult questions:', adultQuestionCount);
  console.log('Pediatric questions:', pediatricQuestionCount);
  console.log('Total:', adultQuestionCount + pediatricQuestionCount);
  
  // Check difficulty distribution
  const adultEasy = (adultContent.match(/difficulty:\s*['"`]easy['"`]/g) || []).length;
  const adultMedium = (adultContent.match(/difficulty:\s*['"`]medium['"`]/g) || []).length;
  const adultHard = (adultContent.match(/difficulty:\s*['"`]hard['"`]/g) || []).length;
  
  console.log('\nAdult difficulty distribution:');
  console.log('Easy:', adultEasy);
  console.log('Medium:', adultMedium);
  console.log('Hard:', adultHard);
  
} catch (error) {
  console.error('Error reading files:', error.message);
}