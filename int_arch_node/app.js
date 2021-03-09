const express = require('express');const mongoose = require('mongoose');
const cors = require('cors');const app = express();
const url = 'mongodb://localhost/highperformance';
const config = require("config");
app.use(express.json());
/* Define Routers*/
const salesmenRouter = require('./routes/salesmen');
const evaluationRecordsRouter = require('./routes/evaluationRecords');
const employeeRouter = require("./externalApis/employee")
const bonusRouter = require("./routes/bonus")
/**/
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('open', () => {
    console.log('DB Connected');
});
app.use(cors())
app.use('/salesman', salesmenRouter);
app.use('/evaluation_record', evaluationRecordsRouter);
app.use("/employee", employeeRouter);
app.use("/bonus",bonusRouter)
app.listen(9000, () => {
    console.log('server started at port : 9000')
});
