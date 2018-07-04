const express = require("express")
const request = require("request-promise")
var mysql = require("mysql")


const app = express()

app.get("/api/invoices/:id", (req, res) => {
  const id = parseInt(req.params.id)
  // esto es una chanchada pero estoy practicando ¯\_(ツ)_/¯
  var connection = mysql.createConnection({
    host : process.env.INVOICE_DB_HOST,
    user : 'root',
    password: process.env.INVOICE_DB_PASSWORD,
    database: 'invoice_mgmt'
  })

  connection.query({
    sql: 'SELECT * FROM `invoices` WHERE `invoice_id` = ?',
    timeout: 40000, // 40s
    values: [`${id}`]
  }, function (err, rows, fields) {
    if(err) throw err
    console.log('La factura con id 1 es: ', rows[0].documentno)
    var docno = rows[0].documentno

    res.json({
      id: id,
      ref: `${docno}`,
      amount: id * 100,
      balance: (id * 100) - 10,
      ccy: "GBP"
    })

  })


})
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`invoice_svc listening on ${port}`)
})
