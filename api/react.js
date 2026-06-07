export default async function handler(req, res) {
  // Izinkan CORS dari origin mana pun (agar frontend bisa panggil)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, emojis, apikey } = req.query;
  if (!url || !emojis || !apikey) {
    return res.status(400).json({ error: 'Missing parameters: url, emojis, apikey' });
  }

  const targetUrl = `https://api-nanzz.my.id/docs/api/tools/react-ch-free.php?url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojis)}&apikey=${apikey}`;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
