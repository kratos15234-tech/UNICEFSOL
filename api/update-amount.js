export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { newAmount, password } = req.body;

  // 🔴 IMPORTANT : N'oublie pas de remettre ton vrai mot de passe ici !
  const ADMIN_PASSWORD = "ton_mot_de_passe_secret"; 

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'thefag' });
  }

  // On utilise TES noms de variables personnalisés
  const url = process.env.UNICEF_KV_REST_API_URL;
  const token = process.env.UNICEF_KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Variables de base de données introuvables sur Vercel' });
  }

  try {
    await fetch(`${url}/set/unicef_amount/${newAmount}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.status(200).json({ success: true, newAmount });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde sur la DB' });
  }
}
