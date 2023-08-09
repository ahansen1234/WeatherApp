import React, { useState } from "react";
import "./App.css";
import { LocationSearch } from "./components/LocationSearch";
import { LocationTable } from "./components/LocationTable";
import { WeatherLocation } from "./model/Weather";
import { searchLocation } from "./services/WeatherService";
import { ErrorAlert, WarningAlert } from "./components/Alerts";
import { WeatherSummary } from "./components/WeatherSummary";

function App() {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  return (
    <div className="container">
      <h1> Weather App</h1>
      <h6>Enter and save cities to check their current weather, and forecasts for the next 24 hours!</h6>
      <LocationSearch onSearch={addLocation} />
      <ErrorAlert message={error} />
      <WarningAlert message={warning} />
      <LocationTable
        locations={locations}
        current={currentLocation}
        onSelect={(location) => setCurrentLocation(location)}
      />
      <WeatherSummary location={currentLocation} />
    </div>
  );
}

export default App;
