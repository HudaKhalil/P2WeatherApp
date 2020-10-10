// Setup empty JS object to act as endpoint for all routes
projectData = [];
// const publicStaticProjPath = path.join(__dirname, 'website');
// Require Express to run server and routes
const express = require('express');
//The body-parser required
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
// app.use(express.static(publicStaticProjPath));
app.use(express.static('website'));

// Setup Server

//Detect the local port of the system/server if no port exist use 8000
const port = process.env.PORT || 8000;

//Server is running in which port
const server = app.listen(port, () => {
    console.log("Server is up and running on localhost: ", port);
});

//GET route
app.get('/all', (request, response) => {
    // console.log('Get Route');
    response.send(projectData);
    //Reset projectData after send request
    projectData = [];
});


//POST route
const data = [];
app.post('/add', (request, response) => {
    newEntry = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }
    projectData.push(newEntry);
    // projectData['date'] = request.body.date;
    // projectData['temp'] = request.body.temp;
    // projectData['content'] = request.body.content;
    // response.send(projectData);
});