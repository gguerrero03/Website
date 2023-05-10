const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "194bd439caf668e4388b11c927aa737a"

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  let lat = 37.77493;
  let lon = -122.4194;
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  console.log(url);
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
		// Printing body
		// console.log(body);

        body = JSON.parse(body)
		console.log(body.main.temp);
	});

  
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});