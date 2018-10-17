const influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

//Middleware Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//SQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "designproject"
});
con.connect(function(err) {
    if (err) throw err
});

//InfluxDB
const influxClient = new influx.InfluxDB({
    database: 'sensorData',
    host: 'localhost:8308',
})

///////////////////////////////////////////////////////////////////////////////////////////////////////
//RESTful API
app.get('/api/user/:id', function( req, res)  {
    let user = null
    const userQuery = `SELECT users.id, users.username, users.password FROM users
                       WHERE users.id = ${req.params.id}`
    con.query(userQuery, function (err, result, fields) {
        if (err) throw err
        user = { "username":result[0].username, "password":result[0].password }

    });
    const permissionsQuery = `SELECT permissionID FROM userpermissions
                       WHERE userID = ${req.params.id}`
    con.query(permissionsQuery, function (err, result, fields) {
        if (err) throw err
        let permissionsArray = []
        for(let x in result) {
            permissionsArray.push(result[x].permissionID)
        }
        user["permissions"] = permissionsArray
        res.send(JSON.stringify(user))
    });
})


app.post('/api/login', function( req, res)  {
    let username = req.body.username
    let password = req.body.password
    const userQuery = `SELECT users.id, users.username, users.password FROM users
                       WHERE users.username = "${username}"`
    con.query(userQuery, function (err, result, fields) {
        if (err) throw err
        if (result[0] == null) {
            res.send(JSON.stringify({errors:"Username not found"}))
        }else {
            let user = { "username":result[0].username, "password":result[0].password }
            if (user.password != password) {
                res.send(JSON.stringify({errors:"Incorrect Password"}))
            } else {
                let userID = result[0].id
                const permissionsQuery = `SELECT permissionID FROM userpermissions
                       WHERE userID = ${userID}`
                con.query(permissionsQuery, function (err, result, fields) {
                    if (err) throw err
                    let permissionsArray = []
                    for(let x in result) {
                        permissionsArray.push(result[x].permissionID)
                    }
                    user["permissions"] = permissionsArray
                    res.send(JSON.stringify(user))
                })
            }

        }

    })
})

app.get('/api/sensors', function(req,res) {
    const sensorQuery = `SELECT sensors.id, sensors.name FROM sensors`
    con.query(sensorQuery, function (err, result, fields) {
        if (err) throw err
        let response = {data: [], errors: [err]}
        for (let x in result) {
            response.data.push({id: result[x].id, name: result[x].name})
        }
        res.send(JSON.stringify(response))
    })
})
app.get('/api/sensorDescriptions/:id', function(req,res) {
    const descriptionQuery = `SELECT buildingDescription FROM sensorDescriptions WHERE sensorID = ${req.params.id}`
    con.query(descriptionQuery, function (err, result, fields) {
        if (err) throw err
        let response = {data: null, errors: [err]}
        response.data = {buildingDescription: result[0].buildingDescription}
        res.send(JSON.stringify(response))
    })
})

app.get('/api/sensorData/:id', function( req, res) {
    const sensorID = req.params.id
    const startTime = parseInt(req.query.startTime) //startTime and endTime in nanoseconds
    const endTime = parseInt(req.query.endTime)
    const dataQuery = `SELECT * FROM energyData WHERE sensorID='${sensorID}' AND time >= ${startTime} AND time <= ${endTime}`
    influxClient.query(dataQuery).then(result => {
        let response = {data: [], errors: []}
        for (let k in result) {
            if (result[k].time != undefined)
                response.data.push({
                    sensorID: parseInt(result[k].sensorID),
                    sensorName: result[k].sensorName,
                    time: result[k].time.getNanoTime(),
                    kVA: result[k].kVA,
                    kVarh: result[k].kVarh,
                    kWh: result[k].kWh,
                })
        }
        console.log(response)
        res.send(JSON.stringify(response))
    }).catch(error => console.log("ERROR:" + error))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))