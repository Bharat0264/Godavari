const { MongoClient } = require('mongodb');

let client;
async function db() {
  if (!process.env.MONGODB_URI) return null;
  if (!client) { client = new MongoClient(process.env.MONGODB_URI); await client.connect(); }
  return client.db(process.env.MONGODB_DB || 'godavari');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const database = await db();
  if (req.method === 'GET') {
    const menu = database ? await database.collection('menu').find({ active: { $ne: false } }).toArray() : [];
    const orders = database ? await database.collection('orders').find({}).sort({ createdAt: -1 }).limit(20).toArray() : [];
    return res.status(200).json({ menu, orders, mongoConnected: Boolean(database) });
  }
  if (req.method === 'POST') {
    if (!database) return res.status(503).json({ error: 'Add MONGODB_URI in Vercel environment variables.' });
    const doc = { ...req.body, createdAt: new Date(), status: req.body.status || 'Placed' };
    await database.collection(req.body.type === 'menu' ? 'menu' : 'orders').insertOne(doc);
    return res.status(201).json(doc);
  }
  res.status(405).json({ error: 'Method not allowed' });
};
