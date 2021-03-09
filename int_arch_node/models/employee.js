const mongoose = require('mongoose')

const salesmanSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    employee_id: {type: Number, required: false},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    department: {type: String, required: false},
    salary: {type: Number, required: false}
})

module.exports = mongoose.model('Salesman',salesmanSchema)