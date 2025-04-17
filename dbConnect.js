const { Client } = require('pg');

// PostgreSQL connection configuration
const client = new Client({
  host: '192.168.1.107',       // The hostname of your PostgreSQL server
  port: 5432,              // Default port for PostgreSQL
  user: 'postgres',       // Your PostgreSQL username
  password: 'Nimda$2005',  // Your PostgreSQL password
  database: 'AES_DB'   // Your database name
});


//const appJs = require('./geoLocation');
//const message = getLocation();
//console.log('Location : ',message.location); 

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
   
    // Dynamic function to update a record based on userId
    const updateRecord = async (userid, newValue) => {
      // Define your SQL query with placeholders for dynamic values
      const query = 'UPDATE uqedbkp.cadusers SET deviceid = $1 WHERE persid = $2';

      try {
        // Execute the query with dynamic values
        const result = await client.query(query, [newValue, userid]);

        console.log('Record updated successfully');
        console.log(result.rowCount, 'row(s) affected');
      } catch (error) {
        console.error('Error updating record:', error);
      }
    };

    // Example: update a record for a specific userId and set new value
    const persid = 130;  // Dynamic userId
    const deviceIId = '23234234'; // New value to update in the record

    updateRecord(persid, deviceIId);
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  })
  .finally(() => {
    // Close the connection after completing the operation
    client.end();
  });