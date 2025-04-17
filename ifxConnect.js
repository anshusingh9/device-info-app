const odbc = require('odbc');
const dsn = 'DSN=gtc-vm-015;HOST=gtc-vm-015;DATABASE=records;SERVICE=9088;USER=uqed;PASSWORD=Welcome@123;SERVER=qeddb'; // Replace 'InformixDSN' with your actual DSN name
// Create a function to connect to the database and update a record
async function updateRecord(persid, deviceid,lat,long) {
  let connection;

  try {
    // Open a connection to the database using the DSN
    connection = await odbc.connect(dsn);
    console.log('Connected to Informix database');

    console.log('***** Person Id ***** :', persid);
    console.log('***** Device Id *****:', deviceid);
    //SQL query to update the record
    const query = 'update uqed.aesdevices set latitude = ?, longitude = ? WHERE persid = ? and devicetype=\'LAPTOP                                            \'';
    console.log('***** Query 1 ******* :', query);
    // Execute the query with dynamic values (newValue, userid)
    const result = await connection.query(query, [lat,long, persid]);
    console.log('Record updated successfully !!!');
    console.log(result);


    const query2 = 'update uqed.cadusers set deviceid = ? WHERE persid = ? ';
    console.log('***** Query 2 ******* :', query2);
    // Execute the query with dynamic values (newValue, userid)
    const result2 = await connection.query(query2, [lat, persid]);
    console.log('Record updated successfully !!!');
    console.log(result2);

  } catch (err) {
    console.error('Error connecting or updating record:', err);
  } finally {
    // Close the connection
    if (connection) {
      await connection.close();
      console.log('Connection closed');
    }
  }
}

// Example: Call the function with dynamic userId and new value
//const persid = userData.persid;  // Dynamic userId
//const deviceid = userData.lat; // New value to update in the record
//const lat1 = userData.lat;
//const long1 = userData.long;

//updateRecord(persid, deviceid,lat,long);
module.exports = updateRecord; 