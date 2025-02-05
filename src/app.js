const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setuphandlebars engine views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ido Zairi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ido Zairi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ido Zairi'
    })
})

app.get('/weather', ({ query }, res) => {
    if (!query.address) {
        return res.send({
            error: 'Unable to find location. Try another search'
        })
    }

    geocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                res.send({ error })
            } else {
                res.send({
                    forecast: forcastData,
                    location,
                    address: query.address
                })
            }
        })
    })
})

app.get('/products', ({ query }, res) => {
    if (!query.search) {
        return res.send({
            error: 'unable to find location. Try another search'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Ido Zairi',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Ido Zairi',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server id up on port ' + port + '.')
})