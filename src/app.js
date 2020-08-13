const path = require('path')
const mapbox = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()


const pubdirpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/Partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(pubdirpath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather App',
        name: 'Adam Wadsworth'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Adam Wadsworth'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Page',
        name: 'Adam Wadsworth',
        message: 'support cost money buy me beer'
    })

})


app.get('/weather', (req, res) => {

    if(!req.query.Address){

        return res.send({
            error:' you must provide an address'
        })

    }

    mapbox.geocode(req.query.Address, (error, {latitude, longitude, place_name} = {}) => {

        if(error != undefined){
             return res.send ({error})
        }
                         
            forecast(latitude, longitude, place_name, (error, data) => {
                if(error != undefined){
                    return res.send ({error}) 
               }
                res.send ({
                    forecast:data,
                    place_name,
                    address: req.query.Address

                }) 
                          
              })
           
           })
        
    })
        



app.get('/products', (req, res) => {
    
    if(!req.query.search){

       return res.send({
            error: 'you must prodvide a search term'

        })

    }

    console.log(req.query.search)

    res.send({
        products:[]
    })

})

app.get('/help/*',(req, res) =>{

       res.render('404', {
        title: '404 Help artical not found',
        name: 'Adam Wadsworth',
        message: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        name: 'Adam Wadsworth',
        message: 'Page Not Found'
    })

})


app.listen(3000, () => {

    console.log('Server is up on port 3000')
})