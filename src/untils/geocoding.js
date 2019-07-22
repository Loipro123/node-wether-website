const request = require('request')
const geoTude = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibG9pYmluaGRvbmciLCJhIjoiY2p5MmNib29yMGc1ZjNubGdsOWJlaTA0YyJ9.mSij7XPiqsP2LfeA4fkCwA&limit=1'
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Can not connect to the Web App',undefined)
       }
       else if(body.features.length===0){
          callback('You give the wrong location',undefined)
       }
       else{
          callback(undefined,{
             latitude:body.features[0].center[1],
             longtitude :body.features[0].center[0],
             place :body.features[0].place_name
          })
       }
       
    })
 }
 const geoWeather = (latitude,longtitude,callback)=>{
    url = 'https://api.darksky.net/forecast/a555c33392bf4e5d408760e2a9687b70/'+latitude+','+longtitude+'?'
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Can not connect to weather app',undefined)
       }
       else if(body.error){
          callback('You give the wrong location',undefined)
       }
       else{
          callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is '+body.currently.precipProbability
          +' chance of rain')
       }
    })
 }
 module.exports={
     geoTude:geoTude,
     geoWeather:geoWeather
 }