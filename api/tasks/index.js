import dbConnect from '../../lib/db.js';
import Task from '../../models/Task.js';
import { requireAuth } from '../../utils/auth.js';

export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const user = await requireAuth(req, res);
  if (!user) return;

  await dbConnect();

  if (req.method === 'GET') {
    const tasks = await Task.find({ user: user._id }).sort({ createdAt: -1 });
    return res.json(tasks);
  }
  if (req.method === 'POST') {
    const title = (req.body?.title || '').trim();
    if (!title) {
      return res.status(400).json({ message: 'Title required' });
    }
    const task = await Task.create({ user: user._id, title });
    return res.status(201).json(task);
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
