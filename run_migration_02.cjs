const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not set in environment.");
    process.exit(1);
  }
  
  try {
    const schemeSplit = dbUrl.split('://');
    const atSplit = schemeSplit[1].split('@');
    
    const lastAtIndex = schemeSplit[1].lastIndexOf('@');
    const credsStr = schemeSplit[1].substring(0, lastAtIndex);
    const hostStr = schemeSplit[1].substring(lastAtIndex + 1);

    const firstColonIndex = credsStr.indexOf(':');
    const user = credsStr.substring(0, firstColonIndex);
    const password = credsStr.substring(firstColonIndex + 1);

    const firstSlashIndex = hostStr.indexOf('/');
    const hostPortStr = hostStr.substring(0, firstSlashIndex);
    const dbQueryStr = hostStr.substring(firstSlashIndex + 1);

    const hostPortSplit = hostPortStr.split(':');
    const host = hostPortSplit[0];
    const port = parseInt(hostPortSplit[1], 10);

    const database = dbQueryStr.split('?')[0];

    const client = new Client({
      user,
      password,
      host,
      port,
      database,
      ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();
    
    console.log("Applying 02_stripe_onboarding.sql migration to live DB...");
    const migrationSql = fs.readFileSync('supabase/migrations/02_stripe_onboarding.sql', 'utf8');
    await client.query(migrationSql);
    console.log("Migration applied successfully. Columns 'stripe_account_id' and 'is_onboarded' added.");
    
    await client.end();
  } catch (err) {
    console.error("Error executing SQL:", err);
  }
}

run();