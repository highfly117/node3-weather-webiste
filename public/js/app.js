fetch('http://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) =>{

        console.log(data)

    })

})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageErr = document.getElementById('Error')
const messageFore = document.getElementById('Forecast')

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

            console.log(data.place_name);
            console.log(data.forecast);

            messageErr.textContent = data.place_name

            messageFore.textContent = data.forecast
            
           

            }


    })

    })

})