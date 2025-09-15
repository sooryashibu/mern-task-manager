# MERN Task Manager — Vercel-only (Fixed: client/dist)

- Frontend: React 19 + Vite + Tailwind + Redux Toolkit
- Backend: Vercel Serverless API routes
- DB: MongoDB Atlas
- SPA routing: catch-all enabled in vercel.json

## Local run
```bash
# 1) frontend
cd client
npm install
npm run build   # output to client/dist
cd ..

# 2) backend deps (root)
npm install

# 3) env (root)
# copy .env.example to .env.local and fill MONGODB_URI, JWT_SECRET

# 4) run (preview/dev)
npm i -g vercel
vercel dev
```
Open http://localhost:3000
