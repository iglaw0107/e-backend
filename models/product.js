const mongoose = require('mongoose');
const category = require('./category');


const productSchema = mongoose.Schema({
    name: {type:String, required:true},
    productImg:{type:String},
    price:{type:Number, required:true},
    stock:{type:Number, required:true, default:0},
    description:{type:String},
    isActive:{type:Boolean, default:true},
    category: {type:mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    rating:{type:Number, default:0},
    numReviews:{type:Number, default:0},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps:true
})


module.exports = mongoose.model('Product', productSchema);