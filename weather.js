//Complete the Weather API Backend part using openweathermap api
const apikey = 'e852b8b250917bc1ffeade8aecb42fc9'

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']

var city = document.getElementById('city')
var date = document.getElementById('date')
var temp = document.getElementById('temp')
var weather = document.getElementById('weather')
var minmax = document.getElementById('hi-low')

var time = new Date()
var day = time.getDay()
var showdate = time.getDate()
var month = time.getMonth()
var year = time.getFullYear()

const fetchWeather = () => {
    var search = document.getElementById('inputSearch').value
    search = search.charAt(0).toUpperCase() + search.slice(1)
    geocoding(search)
}

let geocoding = (search) =>{
    if(search == '')
    {
        city.innerHTML = ''
        date.innerHTML = 'Enter your city in the search box and press enter'
        temp.innerHTML = ''
        weather.innerHTML = ''
        minmax.innerHTML = ''
    }
    else{
        const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apikey}`
        axios.get(geourl)
        .then(res => {
            getWeather(res.data[0].lat, res.data[0].lon, search)
        })
        .catch(err => {
            city.innerHTML = 'Not Found'
            date.innerHTML = ''
            temp.innerHTML = ''
            weather.innerHTML = ''
            minmax.innerHTML = ''
        })
    }
}

let getWeather = (latitude, longitude, search) => {
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
    axios.get(weatherurl)
    .then(res => {
        city.innerHTML = search == res.data.name ? res.data.name : search
        city.innerHTML += ', '+res.data.sys.country
        date.innerHTML = days[day] + ' ' + showdate + ' ' + months[month] + ' ' + year
        temp.innerHTML = (res.data.main.temp-273.15).toFixed(1)+" &#xb0;C"
        weather.innerHTML =  (res.data.weather[0].main)
        minmax.innerHTML = (res.data.main.temp_min-273.15).toFixed(1)+" &#xb0;C / "+(res.data.main.temp_max-273.15).toFixed(1)+" &#xb0;C"
    })
}