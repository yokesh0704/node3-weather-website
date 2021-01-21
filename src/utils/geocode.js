const request = require('request')

const geocode =(address , callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieW9rZXNobWFuaWthbmRhbiIsImEiOiJja2szcmM4aHExZGx2MzBuMmd0dDJ1YTR1In0.AKLMqg9S4M6JKLtbsx1PxQ'
    
    request({url : url , json:true} , (error , {body}) =>{
        if(error){
            callback('Unable to connect the servive! please check the internet connection' , undefined)
        }else if(body.message){
            callback('No such location found!' , undefined)
        }else{
            callback(undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports= geocode