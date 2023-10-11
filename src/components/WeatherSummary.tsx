import React, { useEffect, useState, FC } from "react";
import { Weather } from "../model/Weather";
import { WeatherEntry } from "./WeatherEntry";
import { WeatherLocation } from "../model/Weather";
import { readWeather, readForecast } from "../services/WeatherService";
import "./weatherSummary.css";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id),
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })();
  }, [location]);
  if (!location || !weather || !forecast) return null;

  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <h5>Current Weather</h5>

      <WeatherEntry weather={weather} />
      <h2>Forecast for {location.name}</h2>
      <div>
        <ol className="outerList">
          {forecast.map((timePoint) => (
            <li key={timePoint.dt} className="lineItem">
              <WeatherEntry weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
