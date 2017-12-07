const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

router.use('/users', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
