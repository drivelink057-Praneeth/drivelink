# Status: Technical Blocker (IPv6 ENETUNREACH)

I attempted to connect to the database to execute the migrations, but my runtime environment doesn't have an IPv6 route to the internet, and the connection string you provided (`db.ceeyszpnbttpywsvcztz.supabase.co`) is **IPv6-only**. 

(Supabase recently disabled direct IPv4 connections for standard projects unless the IPv4 add-on is purchased.)

## How to unblock this:
I need the **Connection Pooler URL** which still supports IPv4 natively. 

You can find this in your Supabase Dashboard:
1. Go to **Project Settings > Database**
2. Scroll down to **Connection Pooler**
3. Ensure the **"Use connection pooler"** toggle is enabled (or copy the URI provided there). 
4. The URL should look like this: `postgresql://postgres.ceeyszpnbttpywsvcztz:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

Please provide that new Connection Pooler string!