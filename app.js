const path = require('path')
const express = require('express')
const hbs = require('hbs')

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