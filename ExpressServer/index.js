//const Influx = require('../../')

const express = require('express')
const http = require('http')
const os = require('os')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "designproject"
});

con.connect(function(err) {
    if (err) throw err
});

app.get('/api/user/:id', function( req, res)  {
    let user = null
    console.log("Get User")
    const userQuery = `SELECT users.username, users.password FROM users
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
    console.log(username)
    let password = req.body.password
    const userQuery = `SELECT users.id, users.username, users.password FROM users
                       WHERE users.username = "${username}"`
    con.query(userQuery, function (err, result, fields) {
        if (err) throw err
        if (result[0] == null) {
            res.send(JSON.stringify({Error:"Username not found"}))
        }else {
            let user = { "username":result[0].username, "password":result[0].password }
            if (user.password != password) {
                res.send(JSON.stringify({Error:"Incorrect Password"}))
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
                });
            }

        }

    });

})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))