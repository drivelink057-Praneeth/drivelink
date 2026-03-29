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
    
    // Everything before the last @ is the credentials
    // since password could technically contain an @, let's split by the LAST @
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

    console.log(`Connecting to host: ${host}, database: ${database}, user: ${user}`);
    
    await client.connect();
    console.log("Connected to DB successfully.");

    const schemaSql = fs.readFileSync('supabase/migrations/01_initial_tables.sql', 'utf8');
    console.log("Executing 01_initial_tables.sql...");
    await client.query(schemaSql);

    const seedSql = fs.readFileSync('supabase/seed.sql', 'utf8');
    console.log("Executing seed.sql...");
    await client.query(seedSql);

    const res = await client.query('SELECT count(*) FROM public.schools;');
    console.log(`\nSUCCESS! \nSchools table count: ${res.rows[0].count}`);
    
    await client.end();
  } catch (err) {
    console.error("Error executing SQL:", err);
  }
}

run();