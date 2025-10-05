import { memo, useEffect, useState } from "react"
import Headerweather from "../layout/Headerweather";
import ForecastweatherPageContent from "../ui/ForecastweatherPageContent";
const API_WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function ForecastweatherPage() {

    const [cityName, setCityName] = useState<string>(localStorage.getItem('cityName') ?? '');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [countriesData, setCountriesData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_WEATHER_KEY}&units=metric`);
                if(!res.ok) {
                    throw new Error('error api current');
                }
                const data = await res.json();
                setWeatherData(data);

                const { lat, lon } = data.coord;
                const resCountriesData = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${API_WEATHER_KEY}&units=metric`);
                if(!res.ok) {
                    throw new Error('error api current');
                }
                const dataCountries = await  resCountriesData.json();
                setCountriesData(dataCountries);

                const resForecastWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_WEATHER_KEY}&units=metric`);
                if(!res.ok) {
                    throw new Error('error api current');
                }
                const dataForecast = await  resForecastWeather.json();
                setForecastData(dataForecast);
                
            } catch (error) {
                console.log('Error API:', error);
            } finally {
                setLoading(false);
            }

        }

        fetchWeather();
    }, [cityName]);

    if(loading) return <p>loading...</p>

    return (
        <div>
            <Headerweather cityName={cityName} setCityName={setCityName} />
            <ForecastweatherPageContent cityName= {cityName} setCityName={setCityName} data= {weatherData} forecastData= {forecastData} countriesData= {countriesData}/>
        </div>
    )
}

export default memo(ForecastweatherPage);
