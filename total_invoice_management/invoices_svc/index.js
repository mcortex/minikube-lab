const express = require("express")
const request = require("request-promise")
var mysql = require("mysql")

//var dbhost = process.env.INVOICE_DB_HOST

const app = express()

//const addExpectedDate = async invoice => {
//  try {
//    const { expectedDate } = await request(`${process.env.EXPECTED_DATE_URI}/api/expected-date/${invoice.id}`, {
//      json: true
//    })
//    return Object.assign({}, invoice, { expectedDate })
//  } catch (e) {
//    console.log(`failed to add expected date ${e}`)
//    return invoice
//  }
//}

//app.get("/api/invoices/:id", async (req, res, next) => {
//  try {
//    const id = parseInt(req.params.id)
//
//    // esto es una chanchada pero bueno estoy practicando ¯\_(ツ)_/¯
//    var connection = mysql.createConnection({
//      host : process.env.INVOICE_DB_HOST,
//      user : 'root',
//      password: process.env.INVOICE_DB_PASSWORD,
//      database: 'invoice_mgmt'
//    })
//
//    connection.query({
//      sql: 'SELECT * FROM `invoices` WHERE `invoice_id` = ?',
//      timeout: 40000, // 40s
//      values: [`${id}`]
//    }, function (err, rows, fields) {
//      if(err) throw err
//      console.log('La factura con id 1 es: ', rows[0].documentno)
//      var docno = rows[0].documentno
//
//      res.json({
//        id: id,
//        ref: `INV-${id}`,
//        ref2: `${docno}`,
//        amount: id * 100,
//        balance: (id * 100) - 10,
//        ccy: "DOL"
//      })
//
//    })
//
//
////    const invoice = await addExpectedDate({
////      id: id,
////      ref: `INV-${id}`,
////      amount: id * 100,
////      balance: (id * 100) - 10,
////      ccy: "DOL"
////    })
////    res.json(invoice)
//  } catch (error) {
//    next(error)
//  }
//})
app.get("/api/invoices/:id", (req, res) => {
  const id = parseInt(req.params.id)
  // esto es una chanchada pero estoy practicando ¯\_(ツ)_/¯
  var connection = mysql.createConnection({
    host : 'invoices-svc-mysql',
    user : 'root',
    password: 'mysql123',
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
      ref: `INV-${id}`,
      ref2: `${docno}`,
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
