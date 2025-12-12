import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url } = JSON.parse(event.body || '{}');

    if (!url) {
      return { statusCode: 400, body: JSON.stringify({ error: 'URL is required' }) };
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0; +http://saviour.io)'
      }
    });

    const html = await response.text();

    // Basic Regex Scrapers for OpenGraph
    const getMeta = (prop: string) => {
      const match = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`, 'i')) ||
                    html.match(new RegExp(`<meta name="${prop}" content="([^"]*)"`, 'i'));
      return match ? match[1] : null;
    };

    const title = getMeta('og:title') || getMeta('twitter:title') || html.match(/<title>(.*?)<\/title>/i)?.[1];
    const description = getMeta('og:description') || getMeta('description') || getMeta('twitter:description');
    const image = getMeta('og:image') || getMeta('twitter:image');
    const siteName = getMeta('og:site_name');

    // Platform detection
    let platform = 'Other';
    if (url.includes('medium.com')) platform = 'Medium';
    else if (url.includes('linkedin.com')) platform = 'LinkedIn';
    else if (url.includes('dev.to')) platform = 'Dev.to';
    else if (url.includes('substack.com')) platform = 'Substack';

    return {
      statusCode: 200,
      body: JSON.stringify({
        title: title || 'No Title Found',
        subtitle: description || '',
        thumbnail: image || '',
        platform,
        url
      }),
    };
  } catch (error) {
    console.error('Metadata Fetch Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch metadata' }),
    };
  }
};