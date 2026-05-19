export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { newAmount, mobileLayout, password } = req.body;
  const ADMIN_PASSWORD = "thefag"; 

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const url = process.env.UNICEF_KV_REST_API_URL;
  const token = process.env.UNICEF_KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Variables de base de données introuvables sur Vercel' });
  }

  try {
    // Cas 1 : Sauvegarde de la configuration mobile depuis les sliders
    if (mobileLayout) {
      await fetch(`${url}/set/unicef_mobile_layout/${encodeURIComponent(JSON.stringify(mobileLayout))}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.status(200).json({ success: true, mobileLayout });
    }

    // Cas 2 : Sauvegarde du montant principal (Bouton Save principal)
    if (newAmount !== undefined) {
      await fetch(`${url}/set/unicef_amount/${newAmount}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.status(200).json({ success: true, newAmount });
    }

    res.status(400).json({ error: 'Données manquantes' });
  } catch (error) {
    console.error("Erreur DB:", error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde sur la DB' });
  }
}
