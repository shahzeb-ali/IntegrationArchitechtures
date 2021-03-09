require('mongoose');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Salesman = require('../models/employee');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

let accessToken = null;


async function getToken() {
    /*Body for post Request*/
    const data = {
        client_id: 'api_oauth_id',
        client_secret: 'oauth_secret',
        grant_type: 'password',
        username: 'demouser',
        password: '*Safb02da42Demo$'
    };
    /*Header for post Request*/
    const config = {
        headers:
            {'Content-Type': 'application/json;charset=utf-8', 'Accept': 'application/json',}
    };

    axios.post(`https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken`, data, {
        headers: config
    }).then((response) => {
        /*console.log(response);*/
        accessToken = response.data['access_token'];
        console.log(accessToken);

        return response.data['access_token'];
    }, (error) => {
        console.log(error);
    });
};


/*Get method to retrieve employees list (Method: get) */
router.get('/:id', (req, res) => {
    var empid = req.params.id;

    try {
        axios.get('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/' + empid, {
            headers: {
                'Authorization': 'Bearer ' + 'c3e6b77eb56faeab0556d4b3f8363f912dcfdb32'
            }
        })
            .then((erg) => {

                console.log(erg.data['data'])
                x = erg.data['data']
                checkAndSave(x['employeeId'], x['firstName'], x['lastName'], x['employeeId'], x['unit'], 0);
                res.json(x);
            })
            .catch((error) => {
                console.error(error)
            });
    } catch (err) {
        console.log('Error' + err);
    }


});

router.get('/:id/bonus',((req, res) => {
    try {
        axios.get('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/'+ req.params.id+'/bonussalary' , {
            headers: {
                'Authorization': 'Bearer ' + 'c3e6b77eb56faeab0556d4b3f8363f912dcfdb32'
            }
        })
            .then((erg) => {
                console.log(erg.data['data'])
                x = erg.data['data']
                /*TODO: here to save bonus in collection*/
                res.json(x);
            })
            .catch((error) => {
                console.error(error)
            });
    } catch (err) {
        console.log('Error' + err);
    }
}))







/* if not exists CREATE if exists Update */
function checkAndSave(id, firstName, lastName, employeeId, department, salary) {
    const check = axios.get('http://localhost:9000/salesman/' + 11).then((erg) => {
        if (erg['data'] == null) {
            try {
                axios.post('http://localhost:9000/salesman', {
                    id: id,
                    first_name: firstName,
                    last_name: lastName,
                    employee_id: id,
                    department: department,
                    salary: salary

                }).then((erg) => {
                    console.log(erg)
                }).catch((error) => {
                    console.error(error)
                });
            } catch (err) {
                console.log('Error' + err);
            }
        } else {

            try {
                axios.patch('http://localhost:9000/salesman/' + id, {

                    first_name: firstName,
                    last_name: lastName,
                    employee_id: id,
                    department: department,
                    salary: salary

                }).then((erg) => {
                    console.log(erg)
                }).catch((error) => {
                    console.error(error)
                });
            } catch (err) {
                console.log('Error' + err);
            }

        }
    }).catch((error) => {
        console.error(error)
    });


}



module.exports = router;