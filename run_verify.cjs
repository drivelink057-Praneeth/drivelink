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

    const pkgRes = await client.query('SELECT count(*) FROM public.packages;');
    const instRes = await client.query('SELECT count(*) FROM public.instructors;');

    console.log(`Packages table count: ${pkgRes.rows[0].count}`);
    console.log(`Instructors table count: ${instRes.rows[0].count}`);
    
    await client.end();
  } catch (err) {
    console.error("Error executing SQL:", err);
  }
}

run();