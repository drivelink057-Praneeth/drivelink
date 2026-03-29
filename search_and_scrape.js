import fs from 'fs';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const CITIES = [
  { name: 'Marietta', defaultZip: '30062' },
  { name: 'Alpharetta', defaultZip: '30004' },
  { name: 'Lawrenceville', defaultZip: '30044' },
  { name: 'Smyrna', defaultZip: '30080' },
  { name: 'Sandy Springs', defaultZip: '30328' }
];

const IGNORED_DOMAINS = [
  'yelp.com', 'lessons.com', 'chamberofcommerce.com', 'driverz.com', 
  'sulekha.com', 'yellowpages.com', 'facebook.com', 'mapquest.com', 
  'bbb.org', 'instagram.com', 'drivingschools.directory', 'expertise.com'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function searchDDG(city) {
  const query = `${city} GA driving school joshua's law`;
  console.log(`\nSearching for: ${query}`);
  const params = new URLSearchParams({ q: query });
  const res = await fetch('https://lite.duckduckgo.com/lite/', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });
  
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const links = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.startsWith('http') && !href.includes('duckduckgo')) {
      const urlObj = new URL(href);
      const isIgnored = IGNORED_DOMAINS.some(d => urlObj.hostname.includes(d));
      if (!isIgnored && !links.includes(href)) {
        links.push(href);
      }
    }
  });
  
  return links.slice(0, 3); // Get top 3 legitimate business links
}

async function scrapePage(url, defaultZip) {
  try {
    console.log(`  Fetching: ${url}`);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 10000
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const bodyText = $('body').text().replace(/\s+/g, ' ');
    
    // Title
    const title = $('title').text().trim().split('|')[0].split('-')[0].trim();
    
    // Phone
    const phoneMatch = bodyText.match(/(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
    const phone = phoneMatch ? phoneMatch[0] : null;
    
    // Price
    const joshuaIndex = bodyText.search(/joshua|30\/6|30-hour/i);
    let price = null;
    if (joshuaIndex !== -1) {
      const snippet = bodyText.substring(Math.max(0, joshuaIndex - 150), joshuaIndex + 150);
      const priceMatch = snippet.match(/\$\s*(\d{3}(?:\.\d{2})?)/);
      if (priceMatch) price = priceMatch[0];
    }
    if (!price) {
      const allPrices = Array.from(bodyText.matchAll(/\$\s*([3456]\d{2}(?:\.\d{2})?)/g));
      if (allPrices.length > 0) price = allPrices[0][0];
    }
    
    // Zip
    const zipMatch = bodyText.match(/\b(30[0-3]\d{2})\b/);
    const zip = zipMatch ? zipMatch[0] : defaultZip;
    
    return { title: title || 'Driving School', url, phone, price, zip, status: 'success' };
  } catch (e) {
    console.log(`  Failed: ${e.message}`);
    return null;
  }
}

async function run() {
  const finalData = [];
  
  for (const cityInfo of CITIES) {
    const links = await searchDDG(cityInfo.name);
    for (const link of links) {
      const data = await scrapePage(link, cityInfo.defaultZip);
      if (data && data.phone && data.price) {
        data.city = cityInfo.name;
        finalData.push(data);
      }
      await sleep(1000); // polite delay
    }
  }
  
  fs.writeFileSync('live_schools.json', JSON.stringify(finalData, null, 2));
  console.log(`\nSuccessfully scraped ${finalData.length} fully verified schools.`);
}

run();