import React from "react";
import { FaSun, FaCloudSun, FaCloud, FaCloudRain, FaSnowflake } from "react-icons/fa";


function WeatherCard({ data }) {
  if (!data) return null;

  // Mapeando os climas e indicando um ícone correspondente.
  const getWeatherIcon = (weatherDescription) => {
    if (weatherDescription.includes("sun")) {
      return <FaSun />;
    } else if (weatherDescription.includes("cloud")) {
      return <FaCloudSun />;
    } else if (weatherDescription.includes("rain")) {
      return <FaCloudRain />;
    } else if (weatherDescription.includes("snow")) {
      return <FaSnowflake />;
    }
    return <FaCloud />;
  };

  // Puxando todos os dados para visualizar no card e salvar no ImageBitmapRenderingContext.
  return (
    <div id="id_weather_animated" className="weather_animated">
      <h3>Previsão do Tempo em {data.location.name}</h3>

      <div className="current-weather">
        <div className="weather-icon">
          {getWeatherIcon(data.current.weather_descriptions[0])}
        </div>
        <h4>{data.current.temperature}°C</h4>
        <p>Clima: {data.current.weather_descriptions.join(", ")}</p>
        <p>Humidade: {data.current.humidity}%</p>
        <p>Vento: {data.current.wind_speed} km/h</p>
      </div>
    </div>
  );
}


export default WeatherCard;