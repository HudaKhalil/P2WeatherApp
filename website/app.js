/* Global Variables */
const form = document.getElementById('form');
let zipCD = document.getElementById('zip');
let cntryCD = document.getElementById('countryCod');
let feel = document.getElementById('feelings');
//OpenWeatherMap Data and Personal API Key
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&units=imperial&appid={API key}
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const APIKey = '&appid=8321a2f6cd52a87f06b8cf7d324bc36d';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

// Check if inputs not empty
function checkInputs(zipCDValue, cntryCDValue, feelValue) {
    if (zipCDValue === '') {
        setErrorFor(zipCD, 'Please enter Zip code');
        return false;
    } else {
        setSuccessFor(zipCD);
    }
    if (cntryCDValue === '') {
        setErrorFor(cntryCD, 'Please enter Country code');
        return false;
    } else {
        setSuccessFor(cntryCD);
    }
    if (feelValue === '') {
        setErrorFor(feel, 'Please enter your feelings for today');
        return false;
    } else {
        setSuccessFor(feel);
    }
    return true;
}
//If empty display error msg
function setErrorFor(input, message) {
    const formlabel = input.parentElement;
    const small = formlabel.querySelector('small');
    formlabel.className = 'form-label error';
    small.innerText = message;
}
// If not empty hide error msg
function setSuccessFor(input) {
    const formlabel = input.parentElement;
    formlabel.className = 'form-label success';
}


//When Get Weather btn clicked
document.getElementById('generate').addEventListener('click', whenClick);

//Inside that callback function 
function whenClick(e) {
    const newZip = document.getElementById('zip').value.trim();
    const newCountryCD = document.getElementById('countryCod').value.trim();
    const feelings = document.getElementById('feelings').value.trim();
    //Empty results area
    restResults();
    e.preventDefault();
    // check if inputs not empty (return true)
    if (checkInputs(newZip, newCountryCD, feelings)) {
        getWeather(baseURL, newZip, newCountryCD, APIKey)
            .then(function(data) {
                const temperature = fToC(data.list[0].main.temp);
                //Add data to POST request
                postData('/add', { date: newDate, temp: temperature, content: feelings })
                updateUI();
            })
    }
};
// get this function from: https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php
function fToC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    var message = Math.round(fTemp) + '\xB0F is ' + Math.round(fToCel) + '\xB0C.';
    return message;
}

//GET web API data
const getWeather = async(baseURL, zip, CountryCD, key) => {
    const response = await fetch(baseURL + zip + ',' + CountryCD + '&units=imperial' + key)
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
        // add weather new entry
        document.getElementById('date').innerHTML = `Date: ${retrieveData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${retrieveData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${retrieveData[0].content}`;
    } catch (error) {
        console.log('Error:', error);
    }
};
//When clear form btn clicked
document.getElementById('formReset').addEventListener('click', resetBTN);
//Clear entryHolder data
function restResults() {
    document.getElementById('date').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}
//Clear screen data
function resetBTN() {
    // reset form
    form.reset();
    restResults();
}