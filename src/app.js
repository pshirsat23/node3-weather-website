const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index.hbs' , {
        title : 'Weather',
        name: 'Pranali'
    })
})


app.get('/help', (req, res) =>{
    res.render('help.hbs' , {
        title: 'Help',
        name : 'Pranali Shirsat',
        helpText: 'I need help. Please help me...!'
    })
})


app.get('/about', (req, res) =>{
    res.render('about.hbs' , {
        title: 'About',
        name: 'Pranali Shirsat'
    })
})

// Building a JSON HTTP Endpoint
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {                 
        if(error){
            return res.send({ error })
        }  
        forecast(latitude, longitude, (error, forecastData) => {             
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})


//
// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })


//      404 Challenge
app.get('/help/*', (req,res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Pranali Shirsat',
        errorMessage: 'Help article not found.'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Pranali Shirsat',
        errorMessage: 'Page not found.'
    })
})

/*
app.get('/help/*', (req,res) => {
    res.send('Help article not Found..!')
})

app.get('/*', (req,res) => {
    res.send('My 404 Page')
})
*/
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
