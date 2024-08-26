const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected....");  
    } catch(err){
        console.log("MongoDB not connected",err);
        throw err;
    }
}
module.exports = connectDB;