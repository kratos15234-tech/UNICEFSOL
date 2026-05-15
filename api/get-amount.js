export default async function handler(req, res) {
  // On utilise TES noms de variables personnalisés
  const url = process.env.UNICEF_KV_REST_API_URL;
  const token = process.env.UNICEF_KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error("ERREUR: URL ou Token manquant.");
    return res.status(200).json({ amount: 20931.49 }); 
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
