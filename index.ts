import express, {Express} from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from "morgan"
import helmet from 'helmet'
import cors from 'cors'
import KpiRoutes from "./routes/kpi.router"; 
import ProductRoutes from "./routes/product.router"
import TransactionRoutes from "./routes/Transaction.router"
import {kpis, products, transactions} from './data/data'
import KPI from './models/kpi.model'
import Product from './models/product.model'
import Transaction from './models/transaction.model'
dotenv.config()
const app:Express = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use('/kpi', KpiRoutes)
app.use('/product', ProductRoutes)
app.use("/transaction", TransactionRoutes)

const PORT = process.env.PORT
const mongo_uri= `${process.env.MONGO_URI}`
mongoose.connect(mongo_uri)
.then(async ()=>{
    app.listen(PORT, async()=>{
        console.log(`running at http://localhost:${PORT}`)
        // KPI.insertMany(kpis)
        // Product.insertMany(products)
        // Transaction.insertMany(transactions)
    })
    
})
.catch((e)=>{
    console.log(`${e} did not connect`)
})

