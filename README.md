# Weather-Journal App Project

## Table of Contents

* [Overview](#Overview)
* [Prerequisite Installation](#PrerequisiteInstallation)
* [Instructions](#Instructions)
* [Extras](#Extras)


## Overview
Weather-Journal requires to create an asynchronous web app that uses OpenWeatherWeb API and user data to dynamically update the UI. 

## Prerequisite Installation
1. Node installation from terminal.
2. Install Dependencies from the terminal
    - Install Express package.
    - Install Body-Parser package.
    - Install Cors package. 
## Instructions
1. Require all installed packages in the `server.js` file.
2. Create a server running on localhost:port saved on `server.js` file.
3. Test the server is running, using the installed Node in the terminal to run the file `server.js`.
4. Create GET Route that returns the `projectData`.
6. Create POST Route that adds the incoming data from the server to `projectData`.
7. Get an API credentials from OpenWeatherMap website. 
8. Use the credentials to create global variables  and API url on `app.js` file.
9. Create async function in `app.js` that uses fetch() to make a GET request to the OpenWeatherMap API.
10. Create an event listener `whenClick`, validate that the input fields not empty then add it to button `Get Weather`. This button will call the async GET request with the parameters:
    - base url
    - user entered zip code
    - user entered country code
    - personal API key
11. Create another POST request to add the API data, as well as data entered by the user, to the app.
12. Finally, create another Promise that updates the UI dynamically that is called after the completed POST request. 

## Extras
1. Add validation for input fields to return error messages when fields empty.
2. re-create the `Get Weather` returned data when user click the button and the old data still the same.
2. Add Country code to make the URL generic for any country.
3. Enhanced the layout to be user friendly.
4. Create `Clear Form` button to reset the form for new search.
5. Display the returned temprature in F and C.
