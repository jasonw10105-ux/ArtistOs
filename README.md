# 🎨 ArtistOS — Ready-to-Deploy (Vercel + Supabase)

A complete, production-ready starter for artists to upload works, build catalogues, track inquiries & orders, and publish a public profile.

## 🧩 What’s inside
- React + Vite frontend (client-side routing)
- Supabase Auth, Database, RLS policies, and Storage
- Public artist pages (`/{username}`) and public catalogues (`/c/{username}/{catalogueId}`)
- In-situ visualizer (drop an interior photo and place artwork)
- Multi-currency pricing (display only; ready to plug into Stripe/Yoco/Paystack)
- JSON import/export for backup

## ⚙️ Setup

### 1) Create Supabase project
- Copy **Project URL** and **Anon key** from Settings → API
- Open **SQL Editor** and run the script in `supabase/schema.sql` (creates tables, RLS policies, and storage buckets)
- (Optional) Add OAuth providers in Auth → Providers

### 2) Configure environment
- Duplicate `.env.example` → `.env` locally (for dev)
- On **Vercel** → Project Settings → **Environment Variables**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_SITE_URL` (your deployed site URL)

### 3) Install & run locally
```bash
npm install
npm run dev
```

### 4) Deploy on Vercel
- Push this folder to GitHub
- Import the repo in Vercel
- Add the env vars above
- Vercel will build and deploy automatically

## 🔐 Notes on Security
- RLS policies restrict data by `artist_id` and allow anonymous reads only for public profiles, public artworks, and public catalogues.
- Anonymous inquiries are allowed (so potential buyers can contact you).

## 🚀 Next Integrations
- Payments: plug Stripe (Checkout), Yoco, or Paystack and write order webhooks
- Image optimization: Supabase Image Transformations or an external CDN
- PDF catalogue rendering via serverless function or client-side html2pdf
