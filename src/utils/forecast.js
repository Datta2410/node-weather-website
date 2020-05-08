const request = require('request')
const forecast= (latitude, longitude, callback)=>{
    const options = {
      method: 'GET',
      url: 'https://api.climacell.co/v3/weather/realtime',
      qs: {
        lat: latitude,
        lon: longitude,
        unit_system: 'si',
        fields: 'temp,feels_like,dewpoint,precipitation,humidity',
        apikey: 'bzRwJ5wu0nzRFWchoJyYLJUj5jmUbAFf',
        
       }
    }
     
    request(options,(error,{body}={})=> {
      
    //  callback(null,body)
    
    if (error | body===undefined){
        callback('unable to connect to the weather service!')
    }
    
    else if(JSON.parse(body).message){
        callback(JSON.parse(body).message)
    } else{ 
      const currently= JSON.parse(body)
        callback(null,'Forecast: The temperature outside is ' + currently.temp.value +'C and feels like '+currently.feels_like.value+'C with a hummidity of '+ currently.humidity.value+ '% and dewpoint at '+ currently.dewpoint.value +'C',
        )
      }
      })
  }

//   forecast(28.41667,77.3,(error,data)=>{
//   if (error){
//     console.log('Error:',error)
//   }else{  
//     console.log(data)
//   }
// })
  module.exports=forecast