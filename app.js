const path = require('path')
const express = require('express')

const app = express()

const pubicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './public/views')
app.use(express.static(pubicDirectoryPath))
app.use(express.static(viewsPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Max',
        message: 'Page Not Found'


    })
})






app.listen(3000, () => {
    console.log('Server is up on port 3000')
})