import { promises as fs } from 'fs';
import path from 'path';

async function scanExports() {
  const questionsDir = path.join(process.cwd(), 'src/lib/questions');
  const files = await fs.readdir(questionsDir);
  
  const tsFiles = files.filter(f => 
    f.endsWith('.ts') && 
    f !== 'index.ts' && 
    f !== 'types.ts' && 
    !f.includes('.bak')
  ).sort();
  
  console.log('📊 Scanning question file exports...\n');
  
  for (const file of tsFiles) {
    const filePath = path.join(questionsDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Find export const or export default
    const exportMatch = content.match(/export (const|default) (\w+)/);
    
    if (exportMatch) {
      const exportName = exportMatch[2];
      const fileName = file.replace('.ts', '');
      console.log(`✅ ${fileName}`);
      console.log(`   Export: ${exportName}\n`);
    } else {
      console.log(`❌ ${file} - NO EXPORT FOUND\n`);
    }
  }
}

scanExports().catch(console.error);
