const express = require('../lib/express')

const app = express()

app.get('/', function(req, res){
  throw new Error(' fisrt error');
  //  res.send('hello world')
})

app.listen(3000, function(){
  console.log('start listen port 3000')
})