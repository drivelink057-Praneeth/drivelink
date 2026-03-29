import fs from 'fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const urls = [
  'https://www.a1drivingschools.com/marietta/',
  'https://www.mariettadrivingacademy.com/',
  'https://www.newnan-driving.com/',
  'https://drivesmartgeorgia.com/alpharetta/',
  'https://www.nshdrivingacademy.com/',
  'https://www.allstardrivered.com/georgia/alpharetta/',
  'https://1actdrivingschools.com/lawrenceville/',
  'https://www.jirehdrivingschool.com/',
  'https://www.socialcircledrivingschool.com/',
  'https://www.a1drivingschools.com/smyrna/',
  'https://www.southcobbdrivingschool.com/',
  'https://taggartsdrivingschool.com/',
  'https://trilliumdrivingschool.com/',
  'https://www.sandyspringsdrivingschool.com/'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function scrape() {
  const results = [];
  
  for (const url of urls) {
    try {
      console.log(`Fetching ${url}...`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const bodyText = $('body').text().replace(/\s+/g, ' ');
      
      // Extract phone number (e.g. (770) 555-1234 or 770-555-1234)
      const phoneMatch = bodyText.match(/(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
      const phone = phoneMatch ? phoneMatch[0] : null;
      
      // Extract Joshua's Law pricing
      // Look for numbers near "Joshua", "30/6", "30-hour"
      const joshuaIndex = bodyText.search(/joshua|30\/6|30-hour/i);
      let price = null;
      if (joshuaIndex !== -1) {
        const snippet = bodyText.substring(Math.max(0, joshuaIndex - 150), joshuaIndex + 150);
        const priceMatch = snippet.match(/\$\s*(\d{3}(?:\.\d{2})?)/);
        if (priceMatch) {
          price = priceMatch[0];
        }
      }
      
      if (!price) {
        // Fallback global search for standard package pricing (between 250 and 650)
        const allPrices = Array.from(bodyText.matchAll(/\$\s*([3456]\d{2}(?:\.\d{2})?)/g));
        if (allPrices.length > 0) {
          price = allPrices[0][0]; // pick first reasonable price
        }
      }

      // Very rough address extraction (look for zip code from the prompt lists: 30060, 30062, etc)
      const zipMatch = bodyText.match(/\b(300[0-9]{2}|303[0-9]{2}|301[0-9]{2})\b/);
      const zip = zipMatch ? zipMatch[0] : null;

      results.push({
        url,
        phone,
        price,
        zip,
        status: 'success'
      });

    } catch (e) {
      console.log(`Failed to fetch ${url}: ${e.message}`);
      results.push({
        url,
        phone: null,
        price: null,
        zip: null,
        status: 'failed',
        error: e.message
      });
    }
    
    await sleep(500); // polite delay
  }
  
  fs.writeFileSync('scrape_results.json', JSON.stringify(results, null, 2));
  console.log('Scraping complete.');
}

scrape();