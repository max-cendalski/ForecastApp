const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const pubicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './public/views')
const partialsPath = path.join(__dirname, './public/partials')

//Setup static directory to serve
app.use(express.static(pubicDirectoryPath))
app.use(express.static(viewsPath))

//Setup Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Forecast App',
        name: 'Max'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Max'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Max'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Max',
        errorMessage: 'Page Not Found'
    })
})






app.listen(3000, () => {
    console.log('Server is up on port 3000')
})