import express from 'express';
import authController from './controller/authController.js';
import {auth} from './middleware/authMiddleware.js';

const app = express(); 
const router = express.Router();
router.use(express.json());
// display user page
router.get('/', function(req, res, next) {      
    console.log("hello world!!");
    res.send("hello world!");
});

// Mount the router on the root path
app.use('/', router);
app.use('/auth', authController);
app.use('/addExpense', auth, authController);

app.listen(3000, () => {
    console.log("Listening on port 3000…");
});
