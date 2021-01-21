const request = require('request')

const forecast = (latitude , longitude , callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=b680c69ee217fc69d22d47933db0472d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url :url , json : true} , (error ,{body})=>{
        if(error){
            callback('Unable to connect! Checkout the internet connection' , undefined)
        }else if(body.error){
            callback('No such location found!' , undefined)
        }else{
            callback(undefined , body.current.weather_descriptions[0] +'.'+'It is '+body.current.temperature+' degrees out there in '+ body.location.country+'.There is '+body.current.precip+'% of rain')

        }
    })
}

module.exports = forecast