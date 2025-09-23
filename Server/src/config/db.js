const mongoose = require('mongoose')

const connectDB = async () => {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri)
    console.log('database connected successfully')
}

module.exports = { connectDB }