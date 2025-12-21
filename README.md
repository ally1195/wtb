# wtb
Title: Weather The Better

Tophalf of ReadMe:

Description of the project:
    This is a camping web application to help spontaneous campers quickly decide if the weather conditions are comfortable enough to their likings. This web application was made by campers for campers!

    APIs Used:
    Weatherstack
    National Parks Service (nps) 

    Database used:
    Supabase

    Js Libraries:
    React
    Chart.js
    Swiper.js

    Fetch Calls:
    Weatherstack - current
    Weatherstack - historical
    National Parks Service - parks

    What this application does:
        First, it takes a user input for a specific city and state and searches different weather metrics such as wind speed or temperature. From there, the application will search through weatherstack's current and historic api endpoints to gather weather data for the user. The weather data will be displayed for the user to read and understand. Once the data is pulled from the api and displayed, there are different cards for the user to read. The initial card will be a camping preferences card that allows the user to adjust different metrics that would affect the comfort and safety analysis score. These scores dynamically change as the metrics change from the user and is compared to the weather data.

        Once a city is search, and camping preferences have been placed, a comfort and safety analysis score is made. Using both the comfort and safety analysis scores along with the user's camping preferences, a camping recommendation is provided.

        To help campers decide which city is the best to camp in, there is a chart that compares the last five searches as each search is saved in a supabase database. 

        Lastly to make it more fun, At the bottom of the page, the national parks service api is linked to the state/region being search. So after the (city, state) has been searched, there will be a photo carousal of five national parks found in the state. 

        The goal of this application, is to be a useful tool that provides useful weather data streamlined in a manner that helps campers decide if they want to camp that very day.   

        Target browsers: (iOS, Andriod, Windows, Mac, Safari, Chrome, Mozilla)