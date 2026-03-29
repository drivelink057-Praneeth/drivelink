const fs = require('fs');
let content = fs.readFileSync('/data/workspace/drivelink/supabase/seed.sql', 'utf8');

// Isolate the base SQL before the instructors section
const parts = content.split('-- 3. Insert Instructors');
let newContent = parts[0];

const names = [
  ['John Doe', 'Jane Smith'],
  ['Michael Johnson', 'Emily Davis'],
  ['Sarah Williams', 'David Brown'],
  ['Daniel Miller', 'Jessica Wilson'],
  ['Christopher Moore', 'Amanda Taylor'],
  ['Matthew Anderson', 'Ashley Thomas'],
  ['Robert White', 'Laura Harris'],
  ['Kevin Clark', 'Melissa Lewis'],
  ['Brian Walker', 'Rachel Hall'],
  ['Steven Allen', 'Rebecca Young'],
  ['Edward King', 'Michelle Wright'],
  ['James Taggart', 'Sarah Jenkins'],
  ['Thomas Green', 'Karen Adams'],
  ['Charles Baker', 'Lisa Gonzalez'],
  ['Kyle Anderson', 'Megan Nelson'],
  ['Rachel Marie Lewit', 'Jason Lewit']
];

let instructorsBlock = '-- 3. Insert Instructors\n  INSERT INTO public.instructors (school_id, name, dds_certification_number) VALUES\n';

for (let i = 0; i < 16; i++) {
  const isLastSchool = i === 15;
  instructorsBlock += `  (s_${i}, '${names[i][0]}', 'INST-${i}-A'),\n`;
  instructorsBlock += `  (s_${i}, '${names[i][1]}', 'INST-${i}-B')${isLastSchool ? ';' : ','}\n`;
}

instructorsBlock += '\nEND $$;\n';

fs.writeFileSync('/data/workspace/drivelink/supabase/seed.sql', newContent + instructorsBlock);
console.log('Seed file updated with exactly 2 distinct instructors per school.');
