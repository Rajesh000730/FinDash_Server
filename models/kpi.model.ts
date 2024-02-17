import mongoose from "mongoose"
import loadType from '../config/mongoCurrencyTypeConfig'

loadType(mongoose)

const Schema = mongoose.Schema;

const monthSchema = new Schema({
    month:String,
    revenue:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
       
    },
    expenses:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    operationalExpenses:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    nonOperationalExpenses:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    }
},
{ toJSON: { getters: true } })

const daySchema = new Schema({
    date:String,
    revenue:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    expenses:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },

},
{ toJSON: { getters: true } })

const KPISchema = new Schema({
    totalProfit:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    totalRevenue:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,

    },
    totalExpenses:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    expensesByCategory:{
        type:Map,
        of:{
            type:(mongoose.Types as any).Currency,
            currency:"USD",
            get: (v:number)=>v/100,
        }
    },
    monthlyData:[monthSchema],
    dailyData:[daySchema]
},
{
    timestamps:true,
    toJSON:{ getters:true}
})

const KPI = mongoose.model("KPI", KPISchema)

export default KPI