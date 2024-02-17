import mongoose from "mongoose"
import loadType from '../config/mongoCurrencyTypeConfig'

loadType(mongoose)

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    price:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,
    },
    expense:{
        type:(mongoose.Types as any).Currency,
        currency:"USD",
        get: (v:number)=>v/100,

    },
    transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
},
{
    timestamps:true,
    toJSON:{ getters:true}
})

const Product = mongoose.model("Product", ProductSchema)

export default Product