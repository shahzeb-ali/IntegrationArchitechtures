require('mongoose');
const express = require('express')
const router = express.Router()
const EvaluationRecord = require('../models/evaluationRecord')
/*Get Request to get all evaluationRecords*/
router.get('/', async (req, res) => {
    const all_e_records = await EvaluationRecord.find()
    try {
        res.json(all_e_records)
    } catch (err) {
        res.send('Error' + err)
    }
})
/*delete EvRecord by ID*/
router.delete('/:id', async (req,res)=>{
    try {
        console.log("deleting item")
        const response = await EvaluationRecord.remove({salesman_id: req.params.id});
        console.log("deleted")
        res.json(response)
    } catch (error) {
        console.log("Error : after try " + error)
    }
})
/*delete EvRecord by id and year*/
router.delete('/:id/:year', async (req,res)=>{
    try {
        console.log("deleting item")
        const response = await EvaluationRecord.remove({salesman_id: req.params.id,year:req.params.year});
        console.log("deleted")
        res.json(response)
    } catch (error) {
        console.log("Error : after try " + error)
    }
})
/*  Post Request to save EvaluationRecord*/
router.post('/', async (req, res) => {
    const set_evaluation_record = new EvaluationRecord({
        salesman_id: req.body.salesman_id,
        target_value: 4,
        leadership_competence: req.body.leadership_competence,
        openness_to_employees: req.body.openness_to_employees,
        social_behaviour_to_employee: req.body.social_behaviour_to_employee,
        attitude_toward_clients: req.body.attitude_toward_clients,
        communication_skills: req.body.communication_skills,
        Integrity_to_company: req.body.Integrity_to_company,
        year: req.body.year,
    })
    try {
        const erg = await set_evaluation_record.save()
        res.json(erg)
    } catch (error) {
        console.log("Error : " + error)
    }
})
module.exports = router