const BASE_URL = "https://forecast9.p.rapidapi.com/rapidapi/forecast/";

const API_HEADERS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'forecast9.p.rapidapi.com',
    'X-RapidAPI-Key': 'ce664181f8msh431ddcbeb0c8721p1208b7jsne087c4367aee'
  }
};

let search = document.querySelector("button");
let temperature = document.querySelector("#degree");
let city_name=document.querySelector("#city");
let wind_speed = document.querySelector("#wind_speed");
let humidity =  document.querySelector("#humidity");

const getlocation = () => {
  let locationinput = document.querySelector("input");
  let city = locationinput.value.trim().toLowerCase();

  if (city=="location") {
    alert("Please enter a city.");
    return null;
  } else {
    return city;
  }
};

const findweather = async () => {
  let city = getlocation();
  if (!city) return;
  const url = `${BASE_URL}${city}/summary/`;

  try {
    let response = await fetch(url, API_HEADERS);
    let data = await response.json();
    console.log(data);
    return data;
    
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
    const printdata = async () => {
  let data = await findweather();

  let temp_data = data.forecast.items[0].temperature.max;
  console.log("Temperature:", temp_data);

  let  wind_data= data.forecast.items[0].wind.max;
  console.log("Wind:", wind_data);

  let humidity_data= data.forecast.items[0].relativeHumidity.max;
  console.log("Humidity:", humidity_data);

  temperature.textContent = `${temp_data}°C`;
  city_name.textContent = data.location.name;

  wind_speed.textContent=`${wind_data}km/h`;

  humidity.textContent=`${humidity_data}%`;
};
search.addEventListener("click", () => {
  printdata();
});
