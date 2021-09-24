const express = require('express')
const path = require('path');
const app = express()
const port = 3030
var bodyParser = require('body-parser');
const { response } = require('express');

// Serve static html/js/css content publically
app.use(express.static('www'));
app.use(bodyParser.urlencoded({
  extended: true
}));

const users = [
    "Addison", "Ful", "Mouad", "Devon", "Michael",
    "Lorenzo", "Alex", "Michael", "Scott", "Chris",
    "Phil", "Tj", "Ryan", "Alex", "Kylee", "Emily",
    "Justin", "Josiah", "Samantha", "Samanta",
    "Geoffrey", "Joshua", "Abby", "Caleb",
    "Drew", "Kacey", "Jeremy", "Taejoon",
    "Michael", "Marcus", "Jim", "Keagan", "Sudhanshu", "Rene",
    "Colton", "Austin", "Tyler", "Rishi", "Neel",
    "Parin", "Aaron", "Nicholas", "Bryce", "Sam",
    "Brian", "Alex", "TJ", "Travis", "Eve", "Zhonghe", "Tyler"
];

var receiver = "";
var payment = "";
var ccname = "";
var ccnumber = "";
var ccmonth = "";
var ccyear = "";
var cvv = "";
var preview = "";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {

    console.log("/users");
    res.json(users);
})

app.get('/pay-info', (req, res) => {
  const myHeaders = new Headers();
  myHeaders.append('receiver', receiver);
  myHeaders.append('payment', payment);
  myHeaders.append('ccnumber', ccnumber);
  myHeaders.append('ccmonth', ccmonth);
  myHeaders.append('ccyear', ccyear);
  res.json(myHeaders);
})

app.post('/submit-form', (req, res) => {
  receiver = req.body.users;
  payment = req.body.payment;
  ccname = req.body.ccname;
  ccnumber = req.body.ccnumber;
  ccmonth = req.body.ccmonth;
  ccyear = req.body.ccyear;
  cvv = req.body.cvv;
  preview = req.body.preview;

  var lastFour = ccnumber.substr(ccnumber.length - 4);
  var lastTwo = ccyear.substr(ccyear.length - 2);

  res.write(`Transaction Successful!\n\n`);
  res.write(`Receiver: ` + receiver + `\n`);
  res.write(`Payment: $` + payment + `\n`);
  res.write(`CC Number: **** **** **** ` + lastFour + `\n`);
  res.write(`CC Expiration: ` + ccmonth + `/` + lastTwo  + `\n`);
  res.send();

  //res.sendFile(path.join(__dirname, '/www/pay.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})