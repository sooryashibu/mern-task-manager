import dbConnect from '../../lib/db.js'
import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  try {
    await dbConnect()
    const { email, password } = req.body || {}
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
    const token = sign(user._id)
    return res.json({ token })
  } catch {
    return res.status(500).json({ message: 'Server error' })
  }
}
