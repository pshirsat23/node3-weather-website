const request = require('request')

// Destructuring and Property Shorthand challenge
const forecast = (latitude, longitude, callback) =>{

    const url =  'http://api.weatherstack.com/current?access_key=1e7bf2c581209d16e94d3e22a33a2301&query='+ latitude +','+ longitude +'&units=f'

    request({url , json: true}, (error, {body}) => {                                           // shorthand, Destructuring of response object -->> request({url:url , json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {                                                               // else if (response.body.error) {
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+ ". It is currently "+ body.current.temperature +" degrees out. It feels like "+ body.current.feelslike +" degrees out.") //            callback(undefined, response.body.current.weather_descriptions[0]+ ". It is currently "+ response.body.current.temperature +" degrees out. It feels like "+ response.body.current.feelslike +" degrees out.")

        }
    })
}


module.exports = forecast




/*
const forecast = (latitude, longitude, callback) =>{

    const url =  'http://api.weatherstack.com/current?access_key=1e7bf2c581209d16e94d3e22a33a2301&query='+ latitude +','+ longitude +'&units=f'

    request({url:url , json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0]+ ". It is currently "+ response.body.current.temperature +" degrees out. It feels like "+ response.body.current.feelslike +" degrees out.")
        }
    })
}
*/


