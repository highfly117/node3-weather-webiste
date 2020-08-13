const request = require('postman-request')

const forecast = (latitude, longitude, place_name, callback) => {

    const dkToken = 'e3e6172e1822cb16b93a7f91320ae01e'
    const units = 'uk2'
    const lang = 'en'
    const url = 'https://api.darksky.net/forecast/'+dkToken+'/'+latitude+','+ longitude+'?units='+units+'&lang='+lang+''
    

    request({url, json: true},(error, {body}) => {
        if(error){

            callback('Unable to connect to weather service!', undefined)

        }
        else if (body.error){
            callback('Unable to find location',undefined)

        }else{
            const humidity = parseFloat(body.currently.humidity)*100 

            callback(undefined, 'The current weather in ' +place_name+ ' is ' +body.currently.summary+ '\n' + 'It is curretly ' +body.currently.temperature+ ' degrees and a humidity of '+humidity+'%. There is ' +body.currently.precipProbability+ '% chance of rain')
            

        }
                
        
} )


}

module.exports = forecast