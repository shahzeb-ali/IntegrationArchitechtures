const mongoose = require('mongoose')

const decisionSchema = new mongoose.Schema({
    _id: {type: Number, required: false},
    employee_id: {type: Number, required: false},
    bonus:{type:Number,required:true},
    decision_pending:{type:Boolean,required:true},
    approved:{type:Boolean,required:true},

})

module.exports = mongoose.model('Decision',decisionSchema)