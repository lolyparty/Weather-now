//    // openweather api
// import {ApiKey} from './config.js'

//    const myApiKey = ApiKey.key

//     function getLocation() {
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition); //showPosition function with parameter position
//         } else { 
//           console.log("Geolocation is not supported by this browser.");
//         }
//       }

//       getLocation()

//     function showPosition(position) {
//         var locationlat = position.coords.latitude;
//         var locationlong = position.coords.longitude;
//         console.log(locationlat, locationlong)
//         currentLocation()
//     }

//     async function currentLocation(){
//     //   const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApiKey}`) //current weather
//     const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=ibadan&appid=${myApiKey}`) //3 hour/5day forecast
//       console.log(data)
//       const latlong = await data.json()
//       console.log(latlong)
//     }


    //open weather
    // weather = function(){
    //     function showLocation() {
    //         if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition); //showPosition function with parameter position
    //         } else { 
    //           console.log("Geolocation is not supported by this browser.");
    //         }
    //       }
    
    //       showLocation()
    
    //     function showPosition(position) {
    //         var locationlat = position.coords.latitude;
    //         var locationlong = position.coords.longitude;
    //         console.log(locationlat, locationlong)
    //         currentLocation(locationlat,locationlong)
    //     }
    
    //     async function currentLocation(lat, long){
    //      try{
           
    //         const data = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${myApiKey}`) //daily and hourly forecast

    //           console.log(data)
    //           const latlong = await data.json()
    //           console.log(latlong)
    //           const weatherData = await latlong.hourly
    //           console.log(weatherData)
    //         }
    //         catch(error){
    //             console.log('error')
    //         }
    //      }


    //       // const data = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${myApiKey}`) //3 hour/5day forecast
    //         // const data = await fetch(`http://api.openweathermap.org/data/2.5/onecall?q=Ibadan&appid=${myApiKey}`) //current weather 
    //         // const data = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${long}&appid=${myApiKey}`)
    // }

    // weather();
    // // 