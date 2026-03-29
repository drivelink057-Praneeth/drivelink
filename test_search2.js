import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function searchDDG(query) {
  try {
    const params = new URLSearchParams({ q: query });
    const res = await fetch('https://lite.duckduckgo.com/lite/', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // just dump all anchor tags matching certain patterns
    const links = [];
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http') && !href.includes('duckduckgo')) {
        links.push(href);
      }
    });
    
    console.log("Raw Links found:", links.slice(0, 10));
  } catch (e) {
    console.error(e);
  }
}

searchDDG("driving schools Alpharetta GA");