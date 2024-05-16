import express from "express";
import response from "../../common/response.js";
import { createExpense } from "../../db/expense.js";

var router = express.Router();

router.post("/equally", async function(req,res){
    try {
        const data = {
            amount : req.body.amount,
            name : req.body.name,
            paidBy : req.body.paidBy,
            owedBy : req.body.owedBy,
            createdBy : req.body.createdBy
        }
        console.log(data);
        const info = await createExpense(data);
        res.send(info);

    } catch (error) {
        
    }
})

export default router;