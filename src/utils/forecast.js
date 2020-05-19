const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d440d8149c43aa5c9cfa93f5d68111a&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const weatherDesc = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike

            callback(
                undefined,
                weatherDesc + '. It is currently ' + temperature + ' degress out. Humidity is ' +
                body.current.humidity + '%. It feels like ' + feelsLike + ' degress out.')
        }
    })
}

module.exports = forecast