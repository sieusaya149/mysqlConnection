const express = require("express")
const app = express()
const DbManagerV2 = require("./dbs/init.mysql_v2")
// const DbManager = require("./dbs/init.mysql")

var mysql = require("mysql2");

const mysqlDb = DbManagerV2.getInstance()
mysqlDb.connect()
const PORT = 3003

app.get('/normal', async (req, res) => {
    // const mysqlDb = new DbManager()
    const result = await mysqlDb.makeQuery("SELECT * from USERS LIMIT 10")
    // mysqlDb.end()
    res.status(200).json({result : result})
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})