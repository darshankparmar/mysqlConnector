import dbConn from '../db.js';

export async function executeQuery(query, parameters) {
    return new Promise((resolve, reject) => {
        dbConn.query(query, parameters, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
