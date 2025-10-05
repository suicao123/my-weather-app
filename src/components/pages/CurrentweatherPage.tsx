import { memo, useEffect, useState } from "react"
import Headerweather from "../layout/Headerweather";
import CurrentweatherPageContent from "../ui/CurrentweatherPageContent";
const API_WEATHER_KEY:string = import.meta.env.VITE_WEATHER_API_KEY;

function CurrentweatherPage() {

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
                    throw new Error('Error call API')
                }
                const data = await res.json();
                setWeatherData(data);

                const { lat, lon } = data.coord;
                const resCountries = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${API_WEATHER_KEY}&units=metric`);
                if(!resCountries.ok) {
                    throw new Error('Error call API countries!!!');
                }
                const dataCountries = await resCountries.json();
                setCountriesData(dataCountries);

                const resForecastWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_WEATHER_KEY}&units=metric`);
                if(!resForecastWeather.ok) {
                    throw new Error('Error call API forecast')
                }
                const forecastWeather = await resForecastWeather.json();
                setForecastData(forecastWeather);

            } catch (error) {
                console.log('Error API:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [cityName]);

    if(loading) return <p>Loading .....</p>

    return (
        <div>
            <Headerweather cityName= {cityName} setCityName= {setCityName} />
            <CurrentweatherPageContent cityName= {cityName} setCityName={setCityName} data= {weatherData} forecastData= {forecastData} countriesData= {countriesData}/>
        </div>
    )
}

export default memo(CurrentweatherPage)
