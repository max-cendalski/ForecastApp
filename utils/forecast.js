const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ad065615ad280a7c12c786d6100e1116/' + latitude + ',' + longitude

    // destructing below
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}
            It is currently ${body.currently.temperature}
            There is ${body.currently.precipProbability} chance of rain.`)

        }
    })
}

module.exports = forecast