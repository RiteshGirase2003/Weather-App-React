# Weather App
  Hosted Website: https://weatherapp-riteshgirase2003.netlify.app/

  GitHub Repository: [Weather App on GitHub](https://github.com/RiteshGirase2003/Weather-App-React/tree/V2)

# Team Details
# Ritesh Girase
  Email: riteshgirasecode@gmail.com
  GitHub: https://github.com/RiteshGirase2003
  LinkedIn: https://www.linkedin.com/in/ritesh-girase-096945255/

# Overview
This Weather App is a comprehensive weather forecasting application developed using React.js. The app provides hyperlocal weather data, including minute forecasts, historical data, and various weather conditions for any location on the globe.

# Features
Real-time Weather Data: Fetches weather data using the OpenWeather API.

Search Options: Users can search for a location by typing the city, state, or country name, using voice search, or selecting a place on the map.

Voice Search: Integrated with SpeechRecognition for voice-based searches.

Temperature Units: Option to switch between Celsius and Fahrenheit.

Language Support: Ability to change the language of the text (numbers remain unchanged).

Detailed Weather Information: Provides comprehensive weather details such as temperature, weather conditions, description, sunrise and sunset times, min and max temperatures, pressure, humidity, sea level, ground level, wind speed, wind gust, visibility, and wind direction.

# Technologies Used
React.js: Frontend framework for building the user interface.

Axios: For making API calls to fetch weather data from OpenWeather.

OpenWeather API: Source of the weather data.

MUI Icons: For displaying various weather icons.

React Leaflet: For the interactive map to select locations.

SpeechRecognition: For voice search functionality.

Google Images: For additional visual elements.

# Installation and Setup

## Clone the Repository:
  git clone https://github.com/RiteshGirase2003/Weather-App-React.git
  cd Weather-App-React
## Install Dependencies:
  npm install
## Run the Application:
  npm start
  Open http://localhost:3000 in your browser to view the app.

  
# API Integration
## OpenWeather API
This app uses OpenWeather products to fetch weather data. OpenWeather provides hyperlocal minute forecasts, historical data, current state, and forecasts from short-term to annual weather data.
## Axios
Used to make HTTP requests to the OpenWeather API.

# Voice Search
The app includes voice search functionality powered by the Web Speech API:
Users can click on the microphone icon and speak the name of the city, state, or country to get the weather data for that location. Ensure you have the required types installed for TypeScript support:
#### npm install --save @types/web-speech-api

# Map Integration
The app uses React Leaflet for the interactive map, allowing users to select a location directly on the map to fetch weather data.

# Weather Details Provided
Today's Temperature : Current temperature and conditions.

Weather Conditions: Descriptions like rain, sunny, clear, etc.

Sunrise and Sunset Times: Accurate times for sunrise and sunset.

Min & Max Temperatures: The day's minimum and maximum temperatures.

Pressure: Atmospheric pressure.

Humidity: Current humidity levels.

Location Details: City, state, country, sea level, and ground level information.

Wind: Speed, gusts, and direction.

Visibility: Current visibility range.

# Usage
Search by Text: Type the name of the city, state, or country in the search bar.

Voice Search: Click on the microphone icon and speak the location's name.

Map Search: Select a location on the map to get the weather data.

Change Temperature Units: Switch between Celsius and Fahrenheit.

Change Language: Select the desired language for the text (numbers remain unchanged).

# Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.


# Contact
For any questions or feedback, feel free to reach out to me via GitHub.



# Disclaimer...!
This Weather App project is developed purely for educational purposes. It is not intended for commercial use or as a substitute for professional weather forecasting services. The data provided by this app is sourced from the OpenWeather API, and while efforts have been made to ensure accuracy, no guarantee is made for the reliability or timeliness of the information. Users are encouraged to consult official weather sources for critical decisions or activities where accuracy is paramount.
