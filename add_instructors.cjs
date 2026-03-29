const fs = require('fs');
let content = fs.readFileSync('/data/workspace/drivelink/supabase/seed.sql', 'utf8');

// Insert instructors before END $$;
const instructorsBlock = `
  -- 3. Insert Instructors
  INSERT INTO public.instructors (school_id, name, dds_certification_number) VALUES
  (s_0, 'John Doe', 'INST-0-A'),
  (s_0, 'Jane Smith', 'INST-0-B'),
  (s_1, 'Michael Johnson', 'INST-1-A'),
  (s_2, 'Sarah Williams', 'INST-2-A'),
  (s_3, 'David Brown', 'INST-3-A'),
  (s_4, 'Emily Davis', 'INST-4-A'),
  (s_5, 'Daniel Miller', 'INST-5-A'),
  (s_6, 'Jessica Wilson', 'INST-6-A'),
  (s_7, 'Christopher Moore', 'INST-7-A'),
  (s_8, 'Amanda Taylor', 'INST-8-A'),
  (s_9, 'Matthew Anderson', 'INST-9-A'),
  (s_10, 'Ashley Thomas', 'INST-10-A'),
  (s_11, 'James Taggart', 'INST-11-A'),
  (s_12, 'Robert White', 'INST-12-A'),
  (s_13, 'Laura Harris', 'INST-13-A'),
  (s_14, 'Kyle Anderson', 'INST-14-A'),
  (s_15, 'Rachel Marie Lewit', 'INST-15-A');

END $$;
`;

content = content.replace('END $$;', instructorsBlock);
fs.writeFileSync('/data/workspace/drivelink/supabase/seed.sql', content);
