const si = require('systeminformation');

// Function to get the system UUID
si.system()
  .then(data => {
    //console.log('***** System UUID ***** : ', data);
    //si.system().then(data => console.log(data));
   //si.cpu().then(data => console.log(data));
   si.networkInterfaces().then(data => console.log(data));
   //si.graphics().then(data => console.log(data));
   //si.processes().then(data => console.log(data));
si.osInfo().then(data => console.log(data));
  })
  .catch(error => {
    console.error('Error fetching system information:', error);
  });
