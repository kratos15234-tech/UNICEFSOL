export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { newAmount, password } = req.body;

  // 🔴 IMPORTANT: Mets ton vrai mot de passe d'admin en clair ici !
  // Personne ne peut voir ce fichier, il est exécuté côté serveur.
  const ADMIN_PASSWORD = "thefag"; 

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    await fetch(`${url}/set/unicef_amount/${newAmount}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.status(200).json({ success: true, newAmount });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
  }
}
