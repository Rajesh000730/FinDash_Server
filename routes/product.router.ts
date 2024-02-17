import express, { Response, Router, Request } from 'express'
import Product from "../models/product.model"
const router:Router = Router()
import KPI from '../models/kpi.model'
router.get("/products", async(req: Request, res:Response)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products)
    }catch(e:any){
        res.status(404).json({message: e.message})
    }
})

export default router