const mongoose = require('mongoose');

const mongodbConnection = async()=>{
    console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}`);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}

module.exports = mongodbConnection;