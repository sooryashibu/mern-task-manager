import mongoose from 'mongoose'
const { MONGODB_URI } = process.env
let cached = global._mongoose
if (!cached) cached = global._mongoose = { conn: null, promise: null }
export default async function dbConnect() {
  if (!MONGODB_URI) throw new Error('Missing MONGODB_URI')
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
