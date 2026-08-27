# Godavari — Spice of Andhra

A responsive, three-portal food delivery platform starter: customer ordering, restaurant administration, and delivery-partner workflow.

## Deploy

1. Import this repository in Vercel.
2. Add `MONGODB_URI` (and optionally `MONGODB_DB=godavari`) in **Project Settings → Environment Variables**.
3. Deploy. The `/api/data` serverless endpoint persists menu and order records to MongoDB.

For a local preview, run `npm install` then `npm run dev`. The UI remains fully demonstrable without MongoDB using browser-local data.
