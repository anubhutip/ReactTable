const express = require('express');
const app = express();
const csv = require('csv-parser');  
const fs = require('fs');
const port = 5555;

var MyData = [];
var count = 0;
var cors = require('cors');

app.use(cors())

fs.createReadStream('All_India_pincode_data_26022018.csv')  
  .pipe(csv())
  .on('data', (row) => {
    count++;
    	var obj = {
    		"officename":row['officename'],
    		"pincode":row['pincode'],
    		"id": count
    	}	
    	MyData.push(obj);    
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.get('/', (request, response) => {
  response.send(MyData)
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})