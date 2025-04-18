const express = require('express');
const app = express();
const port = 3000;

app.get('/api/products', (req, res) => {
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
