import dbConnect from '../../lib/db.js'
import User from '../../models/User.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  try {
    await dbConnect()
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    const user = await User.create({ name, email, password })
    return res.status(201).json({ id: user._id, email: user.email })
  } catch {
    return res.status(500).json({ message: 'Server error' })
  }
}
