export default async function handler(req, res) {
  const url = process.env.UNICEF_KV_REST_API_URL;
  const token = process.env.UNICEF_KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ amount: 20931.49, mobileLayout: null }); 
  }

  try {
    // Lecture parallèle du montant et du layout mobile
    const [resAmount, resLayout] = await Promise.all([
      fetch(`${url}/get/unicef_amount`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${url}/get/unicef_mobile_layout`, { headers: { Authorization: `Bearer ${token}` } })
    ]);

    const dataAmount = await resAmount.json();
    const dataLayout = await resLayout.json();
    
    const amount = dataAmount.result ? parseFloat(dataAmount.result) : 20931.49;
    const mobileLayout = dataLayout.result ? JSON.parse(dataLayout.result) : {
      containerScale: 1.00,
      containerX: 0,
      containerY: 0,
      backX: 0,
      frontX: 0
    };

    res.status(200).json({ amount, mobileLayout });
  } catch (error) {
    console.error("Erreur Fetch Multi GET:", error);
    res.status(200).json({ amount: 20931.49, mobileLayout: null });
  }
}
