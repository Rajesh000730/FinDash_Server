import express, { Response, Router, Request } from 'express'

const router:Router = Router()
import Transaction from '../models/transaction.model'
router.get("/transactions", async(req: Request, res:Response)=>{
    try{
        const transactions = await Transaction.find()
        .limit(50)
        .sort({createdOn:-1})
        res.status(200).json(transactions)
    }catch(e:any){
        res.status(404).json({message: e.message})
    }
})

export default router