# Godavari API

Copy `../.env.example` to `backend/.env`, add your MongoDB and Razorpay keys, then run `npm install` and `npm run dev`.

All money is stored and calculated as INR paise. The browser never sets a final order total: it asks `/api/delivery/quote`, which revalidates active menu items and modifiers.
