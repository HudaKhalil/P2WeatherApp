/* Global Variables */
const form = document.querySelector('.form-container');
//OpenWeatherMap Data and Personal API Key
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const APIKey = '&appid=8321a2f6cd52a87f06b8cf7d324bc36d';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//Event listener for Get Weather Button when clicked with callback function whenClick
document.getElementById('generate').addEventListener('click', whenClick);

//Inside that callback function 
function whenClick(e) {
    e.preventDefault();
    const newZip = document.getElementById('zip').value;
    const newCountryCD = document.getElementById('countryCod').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, newCountryCD, APIKey) //newCountryCD,
        .then(function(data) {
            const temperature = data.list[0].main.temp;
            //Add data to POST request
            postData('/add', { date: d, temp: temperature, content: feelings })
            updateUI();
        })
};


//GET web API data
const getWeather = async(baseURL, zip, CountryCD, key) => { //CountryCD,
    const response = await fetch(baseURL + zip + ',' + CountryCD + key) //',' + CountryCD 
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error: ', error);
    }
};

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const retrieveData = await request.json();
        // // show icons on the page
        // icons.forEach(icon => icon.style.opacity = '1');
        // add weather new entry
        document.getElementById('date').innerHTML = `Date: ${retrieveData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${retrieveData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${retrieveData[0].content}`;
    } catch (error) {
        console.log('Error:', error);
    }
};

document.getElementById('formReset').addEventListener('click', resetBTN);

function resetBTN() {
    // reset form
    form.reset();
}