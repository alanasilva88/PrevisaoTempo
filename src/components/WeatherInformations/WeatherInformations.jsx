/* eslint-disable react/prop-types */
import './WeatherInformations.css'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { WiHumidity } from 'react-icons/wi'
import { IoEarthSharp } from 'react-icons/io5'

function WeatherInformations({ weather }) {
    // Verifica se 'weather' e seus objetos internos estão definidos
    if (!weather || !weather.main || !weather.weather || !weather.weather[0]) {
        return <p>Dados do clima indisponíveis.</p>;
    }

    return (
        <div className="weather-container">
            <h2>{weather.name}</h2>
            <div className="weather-info">
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="imagem do clima"
                />
                <p className="temperature">{Math.round(weather.main.temp)}ºC</p>
            </div>
            <p className="description">{weather.weather[0].description}</p>
            <div className="details">
                <p><TbTemperatureCelsius /> Sensação térmica: {Math.round(weather.main.feels_like)}ºC</p>
                <p><WiHumidity /> Umidade: {weather.main.humidity}%</p>
                <p><IoEarthSharp /> Pressão: {weather.main.pressure} hPa</p>
            </div>
        </div>
    );
}

export default WeatherInformations;
