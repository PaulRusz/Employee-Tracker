const fs = require('fs');

function executeQueriesFromFile(db, filePath) {
    const sqlQueries = fs.readFileSync(filePath, 'utf8').split(';');
    sqlQueries.forEach((query) => {
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
            } else {
                console.log('Query executed successfully.');
            }
        });
    });
}

module.exports = {
    executeQueriesFromFile,
};