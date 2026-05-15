export default async function handler(req, res) {
  // On récupère les liens de la base de données
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Si Vercel n'a pas injecté les liens, on le signale !
  if (!url || !token) {
    console.error("ERREUR: URL ou Token manquant.");
    return res.status(200).json({ amount: 20931.49 }); // On renvoie le montant par défaut pour ne pas tout casser
  }

  try {
    const response = await fetch(`${url}/get/unicef_amount`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    
    const amount = data.result ? parseFloat(data.result) : 20931.49;
    res.status(200).json({ amount });
  } catch (error) {
    console.error("Erreur Fetch API:", error);
    res.status(200).json({ amount: 20931.49 });
  }
}
