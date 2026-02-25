
require('dotenv').config();
const mongoose = require('mongoose');



const connectDB = async () => {
    const mongoUri = process.env.DB || process.env.MONGO_URI;

    if(!mongoUri) {
        throw new Error('Missing MongoDb connecting string , Set DB or Mongodb_url ');
    }

    try{
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected');
    }catch(error){
        console.error('X MongoDB connection error : ', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;

