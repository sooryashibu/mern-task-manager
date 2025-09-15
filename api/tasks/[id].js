import dbConnect from '../../lib/db.js';
import Task from '../../models/Task.js';
import { requireAuth } from '../../utils/auth.js';

export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const user = await requireAuth(req, res);
  if (!user) return;

  await dbConnect();

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ message: 'Task id required' });
  }

  if (req.method === 'PUT') {
    const updates = {};
    if (typeof req.body?.title !== 'undefined') updates.title = req.body.title;
    if (typeof req.body?.completed !== 'undefined') updates.completed = req.body.completed;
    const task = await Task.findOneAndUpdate({ _id: id, user: user._id }, updates, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json(task);
  }
  if (req.method === 'DELETE') {
    const task = await Task.findOneAndDelete({ _id: id, user: user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json({ ok: true });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
