import React from 'react';
import { ExtendedWeatherData } from '../types/ExtendedWeatherData';

interface Props {
  weather: ExtendedWeatherData;
  tempF: number;
}

const CurrentWeatherCard: React.FC<Props> = ({ weather, tempF }) => {
  return (
    <div className="card analysis-card">
      <h3>Current Weather</h3>

      <div className="analysis-row">
        <span>Location</span>
        <span>
          {weather.location.name}, {weather.location.region}
        </span>
      </div>

      <div className="analysis-row">
        <span>Temperature</span>
        <span>{tempF.toFixed(1)} °F</span>
      </div>

      <div className="analysis-row">
        <span>Wind Speed</span>
        <span>
          {weather.current.wind_speed !== undefined
            ? `${weather.current.wind_speed} km/h`
            : 'N/A'}
        </span>
      </div>

      <div className="analysis-row">
        <span>Humidity</span>
        <span>
          {weather.current.humidity !== undefined
            ? `${weather.current.humidity}%`
            : 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
