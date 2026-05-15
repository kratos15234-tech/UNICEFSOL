export default async function handler(req, res) {
  // Vercel injecte ces variables secrètes automatiquement
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    const response = await fetch(`${url}/get/unicef_amount`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    
    // data.result contient la valeur de la base de données. 
    // S'il n'y a rien, on renvoie ton montant de base.
    const amount = data.result ? parseFloat(data.result) : 20931.49;
    res.status(200).json({ amount });
  } catch (error) {
    res.status(500).json({ amount: 20931.49 });
  }
}