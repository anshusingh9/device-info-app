//const axios = require('axios');
//const getConn = require('./ifxConnect');
// Your IP geolocation service URL (ipinfo.io in this case)
const API_URL = 'https://ipinfo.io/json';

const updateRecord = require('./ifxConnect');
const si = require('systeminformation');
async function getLocation() {
    try {
        // Make a GET request to the IP geolocation service
       // const response = await axios.get(API_URL);
       const response = await fetch(API_URL);
       const data = await response.json();
      // console.log('data---: ',data["loc"]);
      // return;
        // Extract the location information from the response
       const loc  = data["loc"];

        // loc contains the latitude and longitude in the form "latitude,longitude"
        const [latitude, longitude] = loc.split(',');
        console.log(`*****latitude********* : `,latitude);
        console.log(`*****longitude******** : `,longitude);

        const systemDtl= await si.system();
        console.log(`UUID: `,systemDtl.uuid);
        const dbConn= updateRecord(7016,systemDtl.uuid, latitude,longitude); // Call the function from third.js and store the result
        console.log(`DB Conn: `,dbConn);
       // setTimeout(executeTask, 5000);
        // Return the latitude and longitude
        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

// Get the current location and log the result
getLocation().then(location => {
    console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
}).catch(error => {
    console.error('Failed to get location:', error);
});



  // Call geoLocation function every 5 seconds
   setInterval(async () => {
    try {
    // Call the geoLocation function, assuming it returns latitude and longitude
        await getLocation();  // Assuming getLoc() is a promise-returning function
         console.log(`--- Inside setInterval() --- `);
     } catch (error) {
        console.error('Error executing geoLocation:', error);
     }
   }, 5000);  // 5000 milliseconds = 5 seconds  
  


