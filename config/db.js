const mongoose = require('mongoose')
const connectDB = async(req,res) => {
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
        console.log(`MongoDB connecter`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;