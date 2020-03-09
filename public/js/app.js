console.log('Client side javascript file is loaded')

/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})