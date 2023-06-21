var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../api-gateway/homepage.json');
const jsonData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(jsonData);

/* GET home page. */
router.get('/', (req, res) => {
  res.json(data);
});

module.exports = router;
