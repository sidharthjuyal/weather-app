let weather = {
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&units=metric&appid=66c39666111f1ef00884cede333a7c2e")
            .then((response)=>{
                if(!response.ok){
                    alert('No city found!');
                    throw new Error("No city found!");
                }
                return response.json();
            })
            .then((data)=> this.displayWeather(data));
    },

    search: function(){
         this.fetchWeather(document.querySelector(".search-bar").value);
    },

    displayWeather: function(data) {
         const {name} = data;  
         const {speed} = data.wind; 
         const {icon,description} = data.weather[0]; 
         const {temp,humidity} = data.main; 

         document.querySelector(".city").innerText = "Weather in "+name;
         document.querySelector(".temp").innerText = temp+"°C";
         document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
         document.querySelector(".description").innerText = description;
         document.querySelector(".humidity").innerText ="Humdity: "+ humidity + "%";
         document.querySelector(".wind").innerText = "Wind speed: "+ speed +" km/h";
         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";
    document.querySelector(".weather").classList.remove("loading");
    }
} 

document.querySelector(".search button").addEventListener('click',()=>{
    weather.search();
});

document.querySelector(".search-bar").addEventListener('keyup',(event)=>{
    if(event.key == "Enter")
    weather.search();
});

weather.fetchWeather("Shimla");