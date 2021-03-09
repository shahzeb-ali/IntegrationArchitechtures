require('mongoose');
const express = require('express');
const router = express.Router();
const Salesman = require('../models/employee');
/*Get Request to get all salesmen (Method: Get , Attribute: Salesman) */
router.get('/', async (req, res) => {
    const all_salesman = await Salesman.find({department:"Sales"});
    try {
        res.json(all_salesman);
    } catch (err) {
        res.send('Error' + err);
    }
});
/*  Post Request to save salesman (Method: Post , Attribute: Salesman)*/
router.post('/', async (req, res) => {
    const set_salesman = new Salesman({
        _id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        employee_id: req.body.employee_id,
        department: req.body.department,
        salary: req.body.salary
    })
    try {
        const erg = await set_salesman.save()
        res.json(erg)
    } catch (error) {

    }
})
/* post Request to get document by ID */
router.get('/:id', async (req, res) => {
    const requested_salesman = await Salesman.findById(req.params.id)
    try {
        res.json(requested_salesman)
    } catch (error) {
        console.log("Error : " + error)
    }
})
/* post Request to get document by ID (Method:delete  ,attribute:delete_salesman/:id)*/
router.delete('/:id', async (req, res) => {
    try {
        const response = await Salesman.findByIdAndRemove(req.params.id)
        res.json(response)
    } catch (error) {
        console.log("Error : after try " + error)
    }
})
/*  Patch Request to find by ID and update*/
router.patch('/:id', async (req, res) => {
    try {
        const erg = await Salesman.updateOne({_id: req.params.id},
            {
                $set:
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        employee_id: req.body.employee_id,
                        department: req.body.department,
                        salary: req.body.salary
                    }
            }
        )
        res.json(erg)
    } catch (error) {
        console.log("Error : " + error)
    }
})
/*Get Request to get all Employees (Method: Get , Attribute: Salesman) */
router.get('/employees', async (req, res) => {
    const all_salesman = await Salesman.find();
    try {
        res.json(all_salesman);
    } catch (err) {
        res.send('Error' + err);
    }
});
module.exports = router