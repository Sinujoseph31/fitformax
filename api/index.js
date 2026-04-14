try {
  const app = require('../backend/server');
  module.exports = app;
} catch (error) {
  console.error("Vercel Bridge Error:", error);
  const express = require('express');
  const app = express();
  app.all('*', (req, res) => {
    res.status(500).json({ 
      error: "Bridge Failure", 
      message: error.message,
      stack: error.stack 
    });
  });
  module.exports = app;
}
