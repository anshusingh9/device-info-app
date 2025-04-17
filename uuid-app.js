const express = require('express');
const app = express();
const path = require('path');
// index.js
console.log("This message is printed in CMD when the executable is run.");
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send HTML file
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

const si = require('systeminformation');

const getLoc = require('./geoLocation');

// Function to get the system UUID
si.system()
  .then(data => {
    console.log('System UUID:', data.uuid);   
  })
  .catch(error => {
    console.error('Error fetching system information:', error);
  });

