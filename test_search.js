import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function searchDDG(query) {
  try {
    const params = new URLSearchParams({ q: query });
    const res = await fetch('https://lite.duckduckgo.com/lite/', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // DuckDuckGo Lite HTML structure:
    // <a class="result-url" href="...">...</a>
    // <td class="result-snippet">...</td>
    const results = [];
    $('.result-snippet').each((i, el) => {
      // Navigate up to find the closest row containing the link, or just find links directly
      const snippet = $(el).text();
      const prevRow = $(el).closest('tr').prev('tr');
      const linkEl = prevRow.find('.result-snippet').length > 0 ? prevRow.prev('tr').find('.result-url') : prevRow.find('.result-url');
      const link = linkEl.attr('href');
      
      if (link && !link.includes('duckduckgo')) {
        results.push({ link, snippet });
      }
    });
    console.log(JSON.stringify(results, null, 2));
  } catch (e) {
    console.error(e);
  }
}

searchDDG("driving schools Alpharetta GA");