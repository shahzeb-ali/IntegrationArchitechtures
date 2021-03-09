const axios = require('axios');
require('mongoose');
const express = require('express');
const router = express.Router();
const bonus_decision = require('../models/bonus_decision');
const FormData = require('form-data');
const date = new Date();
/*get all decisions Pending and non-Pending*/
router.get('/', async (req, res) => {
        const all_b_records = await bonus_decision.find()
        try {
            res.json(all_b_records)
        } catch (err) {
            res.send('Error' + err)
        }
})
/*Enter/Post Evaluation Record (For HR Portal)*/
router.post('/:id', async (req, res) => {
    const set_bonus_record = new bonus_decision({
        _id: date.getFullYear().toString()+req.params.id,
        employee_id: req.params.id,
        bonus: req.body.bonus,
        decision_pending: true,
        approved: false,
    })
    try {
        const erg = await set_bonus_record.save()
        res.json(erg)
    } catch (error) {
        console.log("Error : " + error)
    }
})
/*Update Bonus Approval*/
router.patch('/:id', async (req, res) => {
    try {
        if (req.body.decision_pending==false && req.body.approved==true){
            const erg = await bonus_decision.updateOne({employee_id: req.params.id},
                {
                    $set:
                        {
                            approved: true,
                            decision_pending:false
                        }
                }
            )
            res.json(erg)
        }

    } catch (error) {
        console.log("Error : " + error)
    }
})
/*get all pending Bonus Requests (for CEO)*/
router.get('/pending', async (req, res) => {
    const all_b_records = await bonus_decision.find({decision_pending:true})
    try {
        res.json(all_b_records)
    } catch (err) {
        res.send('Error' + err)
    }
})
/*Function to post approved requests to external System*/
function save_bonus_HRM(year, value, res) {
    try {
        var data = new FormData();
        data.append('year', year);
        data.append('value', value);
        var config = {
            method: 'post',
            url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/2/bonussalary',
            headers: {
                'Authorization': 'Bearer 174bbba8cbdf1ee9bca6021bddfe6a03d27205e8',
                'Cookie': 'Loggedin=True; PHPSESSID=o62g0kijhj8k9psriknlvev1u3',
                ...data.getHeaders()
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                res.json(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        console.log('Error' + err);
    }
}
/*pushing all approved and Non-Pending Decisions to the External System*/
router.get('/push',(async (req, res) => {
    const emp_bonus =await  bonus_decision.find({decision_pending:false,approved:true})
    console.log(emp_bonus)
    for (let empBonusKey in emp_bonus) {
        save_bonus_HRM(date.getFullYear(),empBonusKey['bonus']);
    }
    res.send('ok')
}))
module.exports = router