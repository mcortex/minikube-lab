const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res) => {
  res.render('index')
})

app.post('/', (req,res) => {
  //res.render('index')
  console.log("Solicito el id: " + req.body.id)
  let id = req.body.id;
  let url = `${process.env.INVOICES_SVC_URI}/api/invoices/${id}`
  //let url = `http://192.168.99.100:30964/invoices/${id}`

  console.log(url)

  request(url, (err, response, body) => {
      if(err){
        res.render('index', {response: null, error: 'Error, please try again'});
      } else {
        let response = JSON.parse(body)
        if(response == undefined){
          res.render('index', {response: null, error: 'Error, please try again'});
        } else {
          let responseText = `La factura consultada con id: ${response.id} es ${response.ref} y tiene un monto de ${response.amount}.`;
          res.render('index', {response: responseText, error: null});
        }
      }
    });
})

const port = process.env.PORT || 8080

app.listen(port,()=> {
  console.log(`Frontend corriendo en el puerto ${port}`)
})
