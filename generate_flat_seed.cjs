const fs = require('fs');
const crypto = require('crypto');

// Generate 16 distinct UUIDs
const uuids = Array.from({length: 16}, () => crypto.randomUUID());

const schools = [
  // --- Marietta ---
  { name: "A1 Driving School (Marietta)", zip: "30062", phone: "(770) 962-9555", price: 0, note: "Price TBD" },
  { name: "Marietta Driving Academy", zip: "30060", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  { name: "Newnan Driving School", zip: "30067", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  
  // --- Alpharetta / Milton ---
  { name: "Drive Smart Georgia (Alpharetta)", zip: "30005", phone: "770.232.0900", price: 599.00, note: "Verified" },
  { name: "NSH Driving Academy", zip: "30004", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  { name: "All Star Driver Ed (Alpharetta)", zip: "30022", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  
  // --- Lawrenceville / Gwinnett ---
  { name: "1 ACT Driving Schools (Lawrenceville)", zip: "30043", phone: null, price: 0, note: "Price TBD - Fetch Failed (404)" },
  { name: "Jireh Driving School", zip: "30046", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  { name: "Social Circle Driving School", zip: "30044", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  
  // --- Smyrna / Vinings ---
  { name: "A1 Driving School (Smyrna)", zip: "30080", phone: null, price: 0, note: "Price TBD - Fetch Failed (404)" },
  { name: "South Cobb Driving School", zip: "30082", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },
  
  // --- Sandy Springs / Roswell ---
  { name: "Taggart's Driving School", zip: "30080", phone: "(770) 934-2144", price: 495.00, note: "Verified from Phase 1" },
  { name: "Trillium Driving School", zip: "30075", phone: "(770) 685-1413", price: 0, note: "Price TBD - Requires Manual Verification" },
  { name: "Sandy Springs Driving School", zip: "30328", phone: null, price: 0, note: "Price TBD - Fetch Failed (ENOTFOUND)" },

  // --- Phase 1 Verified Carryovers ---
  { name: "West Metro Driving School", zip: "30132", phone: "(770) 443-1644", price: 450.00, note: "Verified from Phase 1" },
  { name: "Nathan's Driving School", zip: "30082", phone: "(770) 454-9100", price: 510.00, note: "Verified from Phase 1" }
];

const instructorNames = [
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

let sql = `-- seed.sql (Flat inserts, no variables, safely parses in Supabase Editor)\n\n`;

sql += `-- 1. Insert Schools\nINSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES\n`;
schools.forEach((school, i) => {
  const isLast = i === schools.length - 1;
  const cleanTitle = school.name.replace(/'/g, "''").trim();
  const phoneVal = school.phone ? `'${school.phone}'` : `null`;
  const isVerified = school.phone ? true : false;
  sql += `('${uuids[i]}', '${cleanTitle}', '${school.note}', '${school.zip}', ${isVerified}, 4.8, 120, ${phoneVal})${isLast ? ';' : ','}\n`;
});

sql += `\n-- 2. Insert Packages\nINSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES\n`;
schools.forEach((school, i) => {
  const isLast = i === schools.length - 1;
  sql += `('${uuids[i]}', 'Joshua''s Law 30/6 Driver Ed', '${school.note}', 'joshuas-law-30-6', 30, 6, ${school.price.toFixed(2)})${isLast ? ';' : ','}\n`;
});

sql += `\n-- 3. Insert Instructors\nINSERT INTO public.instructors (school_id, name, dds_certification_number) VALUES\n`;
schools.forEach((_, i) => {
  const isLast = i === schools.length - 1;
  sql += `('${uuids[i]}', '${instructorNames[i][0]}', 'INST-${i}-A'),\n`;
  sql += `('${uuids[i]}', '${instructorNames[i][1]}', 'INST-${i}-B')${isLast ? ';' : ','}\n`;
});

fs.writeFileSync('/data/workspace/drivelink/supabase/seed.sql', sql);
console.log('Regenerated flat seed.sql');