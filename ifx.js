// Import the ifxdb module
const ifx = require('ifx-db');



// Database connection configuration
const conn = new ifx.Connection({
    host: 'gtc-vm-015',
    database: 'qeddb',
    user: 'uqed',
    password: 'Welcome@123',
    server: 'qeddb',  // e.g., 'informix'
    port: 9088                       // Default Informix port
});

// Connect to the Informix database
conn.connect(function(err) {
    if (err) {
        console.log('Connection error: ' + err);
    } else {
        console.log('Connected to Informix database');

        // Example: Query the database
        conn.query('SELECT * FROM uqedbkp.cadusers', function(err, rows) {
            if (err) {
                console.log('Error querying the database: ' + err);
            } else {
                console.log('Data from Informix:', rows);
            }

            // Close the connection
            conn.close();
        });
    }
});
function greet1(name) {
    return `Hello, ${name}!`;
}

// Export the function so it can be used in other files
//module.exports = greet;