const request = require('postman-request')

debugger

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

            
                const formattedTime = (data) => {
                
                const date = new Date(data * 1000);
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes()
                
            
                return hours + ":" + minutes 
            
            }

            var hourlyTime = [
                formattedTime(body.hourly.data[0].time), 
                formattedTime(body.hourly.data[1].time),
                formattedTime(body.hourly.data[2].time),
                formattedTime(body.hourly.data[3].time),
                formattedTime(body.hourly.data[4].time),
                formattedTime(body.hourly.data[5].time),
                formattedTime(body.hourly.data[6].time),
                formattedTime(body.hourly.data[7].time),
                formattedTime(body.hourly.data[8].time),
                formattedTime(body.hourly.data[9].time),
                formattedTime(body.hourly.data[10].time),
                formattedTime(body.hourly.data[11].time)]

            var hourlyTemp = [
                body.hourly.data[0].temperature,
                body.hourly.data[1].temperature,
                body.hourly.data[2].temperature,
                body.hourly.data[3].temperature,
                body.hourly.data[4].temperature,
                body.hourly.data[5].temperature,
                body.hourly.data[6].temperature,
                body.hourly.data[7].temperature,
                body.hourly.data[8].temperature,
                body.hourly.data[9].temperature,
                body.hourly.data[10].temperature,
                body.hourly.data[11].temperature,
            ]

            var hourlyRain = [
                body.hourly.data[0].precipProbability,
                body.hourly.data[1].precipProbability,
                body.hourly.data[2].precipProbability,
                body.hourly.data[3].precipProbability,
                body.hourly.data[4].precipProbability,
                body.hourly.data[5].precipProbability,
                body.hourly.data[6].precipProbability,
                body.hourly.data[7].precipProbability,
                body.hourly.data[8].precipProbability,
                body.hourly.data[9].precipProbability,
                body.hourly.data[10].precipProbability,
                body.hourly.data[11].precipProbability,
            ]

            


            const humidity = parseFloat(body.currently.humidity)*100 

            const callbackstring = 'The current weather in ' +place_name+ ' is ' +body.currently.summary+ '\n' + 'It is curretly ' +body.currently.temperature+ ' degrees and a humidity of '+humidity+'%. There is ' +body.currently.precipProbability+ '% chance of rain.'

            callback(undefined,{
                forecast: callbackstring,
                hourlyTime,
                hourlyTemp,
                hourlyRain

            })
            

        }
                
        
} )


}

module.exports = forecast