const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    ProductId: {
        type: String,
        required: true,
        trim:true
    },
    ProductPrice: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    ProductQty: {
        type: String,
        required: true,
        trim:true
    },
    shippingAdress:{
        type: String,
        required: true,
        trim:true
    }
})
//
const OrderItem=mongoose.model('OrderItem',orderItemSchema);
module.exports=OrderItem;