const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "194bd439caf668e4388b11c927aa737a"

app.get('/weather/:lat/:lon', (req, res) => {
  // res.send('Hello World!');
  console.log("welcome to the root!");

  var lat = req.params.lat;
  var lon = req.params.lon;
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  console.log(url);
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
        // Printing body
        body = JSON.parse(body)
        let weatherStatus = body.weather[0].main; // Gives us the weather
        res.send({"temperature" : body.main.temp , "weatherStatus" : weatherStatus});
		console.log(body.main.temp);
	});

});


    app.get('/5day/:lat/:lon', (req, res) => {
        // res.send('Hello World!');
        console.log("welcome to the root!");
        
        var lat = req.params.lat;
        var lon = req.params.lon;
        var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      
        
          request(url, (error, response, body)=>{
              
              // Printing the error if occurred
              if(error) console.log(error)
             
              // Printing status code
              console.log(response.statusCode);
               
              // Printing body
              body = JSON.parse(body)
              const week =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
              let forecast = [];

              let todaysDate = new Date().getDay(); // Returmns a number 0-6
              for (let i = 0; i < 5; i++){ // 0 1 2 3 4 
                let tempSum = 0; // sum of all temps for a day
                let count = 0; // number of datapoints for a day
                for (let dataPoint of body.list){ // iterates through each date point 
                    let date = new Date(dataPoint.dt * 1000) // Convert seconds to ms, 
                    if (date.getDay() == todaysDate){ // If the day of week (0-6) matches today's date 
                        count++; // Adds 1 to out total data points for the day
                        tempSum += dataPoint.main.temp; 
                    }
                }
              let day = {"dayName" : week[todaysDate] , "temp" : Math.round(tempSum/count)}
              forecast.push(day); 
              todaysDate = (todaysDate + 1) % 7
            }
            res.send({forecast});
          });
        
      });



app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});