//const Influx = require('../../')

const express = require('express')
const http = require('http')
const os = require('os')
const mysql = require('mysql')
const app = express()

app.use(express.json());

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
    let password = req.body.password

    const userQuery = `SELECT users.username, users.password FROM users
                       WHERE users.username = ${username}`
    con.query(userQuery, function (err, result, fields) {
        if (err) throw err
        let user = { "username":result[0].username, "password":result[0].password }
        if (user.password != password) {
            res.send("Incorrect Password")
        }
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
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))