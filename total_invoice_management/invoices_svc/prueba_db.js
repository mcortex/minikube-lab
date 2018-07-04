const express = require("express")
var mysql = require("mysql")

const app = express()

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


//  res.json({
//    id: id,
//    ref: `INV-${id}`,
//    ref2: `${docno}`,
//    amount: id * 100,
//    balance: (id * 100) - 10,
//    ccy: "GBP"
//  })
})

const port = process.env.PORT || 8585

app.listen(port, () => {
  console.log(`invoices_svc listening on ${port}`)
})
