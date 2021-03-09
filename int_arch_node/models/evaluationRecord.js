const mongoose = require('mongoose');

const evaluationRecordSchema = new mongoose.Schema({

    target_value: {type: Number, required: true},
    salesman_id: {type: Number, required: true},
    leadership_competence: {type: Number, required: true},
    openness_to_employees: {type: Number, required: true},
    social_behaviour_to_employee: {type: Number, required: true},
    attitude_toward_clients: {type: Number, required: true},
    communication_skills: {type: Number, required: true},
    Integrity_to_company: {type: Number, required: true},
    year: {type: Number, required: true},

});

module.exports = mongoose.model('EvaluationRecord', evaluationRecordSchema);
