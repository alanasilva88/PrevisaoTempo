/* eslint-disable react/prop-types */
import './WeatherInformations5day.css'
import { LuCalendarDays } from 'react-icons/lu'

function WeatherInformations5day({ weather5day }) {

    // Verifica se 'weather5day.list' existe
    if (!weather5day || !weather5day.list || weather5day.list.length === 0) {
        return <p>Dados da previsão de 5 dias indisponíveis.</p>;
    }

    // Função para agrupar previsões por dia
    const groupByDay = (list) => {
        return list.reduce((acc, current) => {
            const date = new Date(current.dt_txt).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(current);
            return acc;
        }, {});
    };

    // Agrupamos as previsões por dia
    const dailyForecasts = groupByDay(weather5day.list);

    return (
        <div className="weather5day-container">
            <h3><LuCalendarDays /> Previsão para 5 dias</h3>
            <div className='weather5day-list'>
                {Object.keys(dailyForecasts).map((day, index) => {
                    // Para cada dia, calcular a mínima e máxima
                    const temps = dailyForecasts[day].map(item => item.main.temp);
                    const minTemp = Math.min(...temps);
                    const maxTemp = Math.max(...temps);
                    const weatherDescription = dailyForecasts[day][0].weather[0].description;
                    const weatherIcon = dailyForecasts[day][0].weather[0].icon;

                    return (
                        <div className="weather5day-items" key={index}>
                            <h3>{day}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt="imagem do clima" />
                            <p className='description'>{weatherDescription}</p>
                            <p> {minTemp.toFixed(1)}°C min</p>
                            <p> {maxTemp.toFixed(1)}°C max</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherInformations5day;
