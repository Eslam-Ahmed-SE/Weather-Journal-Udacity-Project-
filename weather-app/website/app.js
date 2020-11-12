// Global API Variables 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// My API key that I just created befpre submission wasn't working at the time of submission with error 401 (Your API key is not activated yet. Within the next couple of hours, it will be activated and ready to use.): https://openweathermap.org/faq
// so, I thought I would use another one's api key on my previous submission
// I now know my mistake and I wouldn't repeate it again
const apiKeyOWM = '2d9216f38c4a0eb381ea9e5f9bbbf136';

// Getting current date with JavaScript dynamically
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



// Async task to get weather from external api (OpenWeatherMap)
const getWeather = async (url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData;
    }
    catch (e){
        console.log("error ", e)
    }
}

// postData function to save weather data in servers local data variable
const postData = async ( url = '', data = {})=>{
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
    }catch(error) {
    console.log("error", error);
    }
}

// getData function to get the weather data stored in the server's local variable
const getData = async (url='') => {
    const request = await fetch(url);
    try {
        let data = request.json();
        return data;
    } 
    catch(err){
        console.log(err);
      }
}

// updateUI function to update the website interface with the new weather data
const updateUI = async () => {
    const dateDiv = document.getElementById('date');
    const tempDiv = document.getElementById('temp');
    const feelingsDiv = document.getElementById('content');
    
    // Getting the new data that was previuosly saved in the local server
    let UI_Data = await getData("/getWeather");
    
    dateDiv.innerText = UI_Data.date;
    tempDiv.innerText = UI_Data.temperature;
    feelingsDiv.innerText = UI_Data.feelings;
}

// performAction main function to be called when the user clickes the generate button
const performAction = async function() {
    // Getting user input
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Setting up the baseURL with user input (also specifying the weather unit to be metrics) 
    const url = `${baseURL}${zip}&APPID=${apiKeyOWM}&units=metric`;
    
    //calling getWeather to get weather from external API, then saving it in local server api with postData, then calling updateUI to update the interface with new data
    getWeather(url)
        .then(function(data){
            postData('/addWeather', {date: newDate, temperature: data.main.temp, feelings:feelings} );
        })
        .then(function(){
            updateUI()
        })

}

// generate button click listener
document.getElementById('generate').addEventListener('click', performAction);
