import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5day from './components/WeatherInformations5day/WeatherInformations5day'
import Loading from './components/Loading/Loading'
import { LiaTemperatureHighSolid } from "react-icons/lia";

function App() {
  const [weather, setWeather] = useState(null); // Alterado para null inicialmente
  const [weather5day, setWeather5day] = useState(null); // Alterado para null inicialmente
  const [error, setError] = useState(""); // Adicionada para mensagens de erro
  const [loading, setLoading] = useState(false); // Adiciona estado de carregamento

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city) {
      alert("Por favor, insira o nome de uma cidade.");
      return;
    }

    const key = "f5264a6e4d1c1dc185b475aab851239e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5day = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      // Limpa mensagens de erro anteriores
      setError("");
      const [info, info5day] = await Promise.all([
        axios.get(url),
        axios.get(url5day)
      ]);

      setWeather(info.data);
      setWeather5day(info5day.data);
    } catch (error) {
      // Verifica se a resposta contém um erro de cidade não encontrada
      if (error.response && error.response.status === 404) {
        setError("Cidade não encontrada. Verifique o nome e tente novamente.");
        setWeather(null);
        setWeather5day(null);
      } else {
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      }
      setWeather(null);
      setWeather5day(null);
    } finally {
      setLoading(false); // Encerra o carregamento
    }
  }

  return (
    <>
      <div className='container'>
        <h1><LiaTemperatureHighSolid /> Previsão do Tempo</h1>
        <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
        <button onClick={searchCity}>Buscar</button>
        {loading && <Loading />} {/* Exibe o componente de loading */}
        {error && <p>{error}</p>} {/* Exibe a mensagem de erro */}
        {weather && !loading ? <WeatherInformations weather={weather} /> : null}
        {weather5day && !loading ? <WeatherInformations5day weather5day={weather5day} /> : null}
      </div>
    </>
  )
}

export default App;
