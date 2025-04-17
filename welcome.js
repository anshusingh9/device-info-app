const express = require('express');
const app = express();
const path = require('path');
// index.js
console.log("This message is printed in CMD when the executable is run.");

const si = require('systeminformation');

// Function to get the system UUID
si.system()
  .then(data => {
    console.log('System UUID:', data.uuid);
  })
  .catch(error => {
    console.error('Error fetching system information:', error);
  });

  
  
  
  
  
  
  