import React from 'react';

const AboutPage: React.FC = () => (
    <div>
        <h1> About this camping app</h1>
        <p>
            This is a camping web application to help spontaneous campers quickly decide if the weather conditions are comfortable enough to their likings.
            This web application was made by campers for campers! On the next page, you will be prompted to insert a city and State.
            Following that, a list of weather data will appear. Depending on your choice of perferences,
            this would used and compared to the weather data to evaluate a comfort and safety score. With these two scores, 
            camping recommendation will be made whether to camp or not.

            There is also historical weather data used to show the temperature of the past five days to get a rough estimate 
            of how the weather has been in the past in that city.  

            To make this more appealing, as you search between different cities, it will be saved and put on a chart to have a 
            visual comparsion of the current temperature between cities.

            There is also a picture carousal of national parks found at the state inputed.

            Our team hopes this web application will make spontaneous camping more feasible 
            and get your gear out there faster!

            Happy Camping! 
        </p>
    </div>
);

export default AboutPage;