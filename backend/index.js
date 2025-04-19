const express = require('express');
const path = require('path');
const blockchain = require('../blockchain');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Get blockchain
app.get('/api/chain', (req, res) => {
  res.json(blockchain.chain);
});

// Add block
app.post('/api/addBlock', (req, res) => {
  const data = req.body.data;
  blockchain.addBlock(data);
  res.json({ message: "Block added!", chain: blockchain.chain });
});

// Validate chain
app.get('/api/validate', (req, res) => {
  const valid = blockchain.isChainValid();
  res.json({ valid });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
