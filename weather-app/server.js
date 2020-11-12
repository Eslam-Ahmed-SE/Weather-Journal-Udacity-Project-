// Data object local variable endpoint for the server
projectData = {};

// Declairing requered express to run the server and the routes
const express = require('express');

// Starting the express server
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initializing main project folder
app.use(express.static('website'));

// POST route with a call back function
app.post('/addWeather', addWeatherData);

// The call back function
function addWeatherData(request, response){
    projectData ={
        date: request.body.date,
        temperature: request.body.temperature,
        feelings: request.body.feelings
    };
    
    response.send(projectData);
};


// GET route with a call back function
app.get('/getWeather', sendWeatherData);

// The call back function
function sendWeatherData(request, response) {
    response.send(projectData);
};


// Server port
const port = 6060;
// Seting up the server
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
};






