import express, { Response, Router, Request } from 'express'

const router:Router = Router()
import KPI from '../models/kpi.model'
router.get("/kpis", async(req: Request, res:Response)=>{
    try{
        const kpis = await KPI.find();
        res.status(200).json(kpis)
    }catch(e:any){
        res.status(404).json({message: e.message})
    }
})

export default router