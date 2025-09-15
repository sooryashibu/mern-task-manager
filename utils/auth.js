import jwt from 'jsonwebtoken'
import dbConnect from '../lib/db.js'
import User from '../models/User.js'

export async function requireAuth(req, res) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null
  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return null
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await dbConnect()
    const user = await User.findById(decoded.id).select('_id name email')
    if (!user) {
      res.status(401).json({ message: 'Invalid token' })
      return null
    }
    return user
  } catch {
    res.status(401).json({ message: 'Invalid token' })
    return null
  }
}
