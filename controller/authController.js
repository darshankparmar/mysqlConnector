import express from 'express';
var router = express.Router();
import dbConn from '../db/db.js'; 
// display user page
router.get('/', function(req, res, next) {      
    dbConn.query('SELECT * FROM users WHERE username = ?',['hiren'] ,function(err, rows) {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            console.log(rows);
            // Assuming rows contain user data, you can send it back as JSON
            res.json({ users: rows });
        }
    });
});

export default router;