import mongoose from "mongoose"
import loadType from '../config/mongoCurrencyTypeConfig'

loadType(mongoose)

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    buyer:{
        type:String,
        require:true
    },
    amount:{
        type: String,
        require:true

    },
    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
},
{
    timestamps:true,
    toJSON:{ getters:true}
})

const Transaction= mongoose.model("Transaction", TransactionSchema)

export default Transaction