import { verifyToken } from '../../lib/jwt';

export default function handler(req, res) {
  const token = req.cookies.token;

  try {
    const decoded = verifyToken(token);
    res.status(200).json({ decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
