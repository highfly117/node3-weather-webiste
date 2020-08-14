



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageErr = document.getElementById('Error')
const messageFore = document.getElementById('Forecast')
const tablet1 = document.getElementById('time1')



//messageErr.textContent = "From code"

weatherForm.addEventListener('submit', (e) => { 

    e.preventDefault()

    const location = search.value

    messageErr.textContent = "Loading..."
    messageFore.textContent = ""

    fetch('/weather?Address=' + location).then((response) => {

    response.json().then((data) => {

        if(data.error) {

            console.log(data.error);
            messageErr.textContent = data.error;
        }else{

            console.log(data)

            

                
            for(i=1; i<13; i++){

                document.getElementById("time"+i).textContent = data.hourlyTime[i-1]
                document.getElementById("Temp"+i).textContent = data.hourlyTemp[i-1] + '°'

                var rainchance = (data.hourlyRain[i-1])*100

                document.getElementById("Rain"+i).textContent = rainchance.toFixed(0) + '%'
            }
            
            
            
            
            

            console.log(data.place_name);
            console.log(data.forecast);

           tablet1.textContent = data.hourlyTime[0]

           messageErr.textContent = data.place_name

            messageFore.textContent = data.forecast
            
           

            }


    })

    })

})