const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    industry: {
        type: String,
        required: true
    },
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        postalCode: {type: String, required: true}
    },
    foundedYear: {
        type: Number, 
        required: true
    },
    noEmployees: {
        type: Number, 
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('company', companySchema)