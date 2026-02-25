const mongoose = require('mongoose');


const cartItmeSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
});



const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    items:[cartItmeSchema]
}, {timestamps:true});


module.exports = mongoose.model('Cart', cartSchema);