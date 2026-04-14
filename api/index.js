const connectDB = require('../backend/config/db');
let cachedDb = null;

module.exports = async (req, res) => {
  if (!cachedDb) {
    try {
      await connectDB();
      cachedDb = true;
    } catch (err) {
      return res.status(500).json({ error: "Database Connection Error", message: err.message });
    }
  }

  try {
    const app = require('../backend/server');
    return app(req, res);
  } catch (error) {
    console.error("Vercel Bridge Error:", error);
    return res.status(500).json({ 
      error: "Bridge Failure", 
      message: error.message 
    });
  }
};
