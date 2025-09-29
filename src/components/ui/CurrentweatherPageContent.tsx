import { memo } from "react"
import { CiLocationOn } from "react-icons/ci"
import { FiWind } from "react-icons/fi"
import { MdOutlineVisibility } from "react-icons/md"
import { TbUvIndex } from "react-icons/tb"
import { WiHumidity } from "react-icons/wi"
import { Link } from "react-router"

interface UVResult {
  uv: number;
  level: string;
}

function CurrentweatherPageContent(
    { cityName, data, countriesData, setCityName, forecastData }: 
    { cityName: string, data: any, countriesData: any, setCityName: any, forecastData: any }
) {
    

    const countryName:string = data.sys.country;
    const temp_max:number = Math.floor(data.main.temp_max);
    const temp_min:number = Math.floor(data.main.temp_min);
    const feelLike:number = Math.floor(data.main.feels_like);
    const description:string = data.weather[0].description;
    const dt:number = data.dt;
    const timezone:number = data.timezone;
    const sunrise: number = data.sys.sunrise;
    const sunset: number = data.sys.sunset;

    const localTime: Date = new Date((dt + timezone) * 1000);

    const date = localTime.getDate();
    const month = localTime.getMonth();
    const year = localTime.getFullYear();

    const daysOfWeek: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day: string = daysOfWeek[localTime.getUTCDay()];
    const hours: string = localTime.getUTCHours().toString();
    const minutes:string = localTime.getUTCMinutes().toString();
    const imgWeather: string = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    const windSpeedKmh: string = (data.wind.speed * 3.6).toFixed(1);
    const humidity: number = data.main.humidity;
    const visibility = (data.visibility / 1000).toFixed(1); 

    function estimateUV(weatherData: any): UVResult {
        const { lat } = weatherData.coord;
        const { sunrise, sunset } = weatherData.sys;
        const { all: cloudPercent } = weatherData.clouds;

        // 1. Xác định UV tối đa theo vĩ độ
        let uvMax = 8; // mặc định
        if (Math.abs(lat) < 25) uvMax = 11; // vùng nhiệt đới
        else if (Math.abs(lat) > 50) uvMax = 6; // vùng ôn đới cao

        // 2. Tính góc mặt trời theo thời gian
        const dayLength = sunset - sunrise;
        const timeSinceSunrise = weatherData.dt - sunrise;
        let sunFactor = 0;
        if (timeSinceSunrise > 0 && timeSinceSunrise < dayLength) {
            // Dùng sin để mô phỏng cường độ mặt trời (mạnh nhất vào giữa trưa)
            const progress = timeSinceSunrise / dayLength; // 0 -> 1
            sunFactor = Math.sin(Math.PI * progress); // 0 lúc bình minh & hoàng hôn, 1 lúc giữa trưa
        }

        // 3. Giảm UV theo độ mây
        const cloudFactor = 1 - cloudPercent / 100;

        // 4. Tính UV
        const uv = uvMax * sunFactor * cloudFactor;

        if (uv < 3) {
            return { uv: Number(uv.toFixed(1)), level: "Low"};
        } else if (uv < 6) {
            return { uv: Number(uv.toFixed(1)), level: "Moderate"};
        } else if (uv < 8) {
            return { uv: Number(uv.toFixed(1)), level: "High"};
        } else if (uv < 11) {
            return { uv: Number(uv.toFixed(1)), level: "Very High"};
        } else {
            return { uv: Number(uv.toFixed(1)), level: "Extreme"};
        }
    }

    const {uv, level} = estimateUV(data);

    function formatHumidityStatus(humidity: number): string {
        if (humidity < 30) {
            return "Dry (Too Low)";
        } else if (humidity >= 30 && humidity <= 50) {
            return "Comfortable";
        } else if (humidity > 50 && humidity <= 60) {
            return "Slightly Humid";
        } else if (humidity > 60 && humidity <= 80) {
            return "Humid";
        } else {
            return "Very Humid/Unhealthy";
        }
    }

    const humidityStatus = formatHumidityStatus(humidity);

    function formatLocalTime(dt: number): string {
        const date = new Date(dt * 1000);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    }

    const sunriseTime = formatLocalTime(sunrise);
    const sunsetTime = formatLocalTime(sunset);
    
    const countriesList: any = countriesData.list;
    
    function handleClickCountries(name: any) {
        setCityName(name);
        localStorage.setItem('cityName', name);
    }

    const listForecastWeather = forecastData.list.filter((data: any) => data.dt_txt.includes("12:00:00"));
    

    return (
        <div id="weather-current-content">
            <div className="weather-current-content-left-column">
                <div className="current-weather-left-column">
                    <div className="current-weather-left-column-time">
                        <div className="current-weather-left-column-time-location">
                            <CiLocationOn 
                                size={20}
                            />
                            <p>{countryName}, {cityName}</p>
                        </div>
                        <p>{day}</p>
                        <p>{date} {months[month]}, {year}</p>
                    </div>
                    <div className="current-weather-left-column-temp">
                        <div className="current-weather-left-column-temp-C">
                            <p>{temp_max}°C</p>
                            <p>/{temp_min}°C</p>
                        </div>
                        <div className="current-weather-left-column-temp-weather">
                            <p>{description}</p>
                            <p>Feels like {feelLike}</p>
                        </div>
                    </div>
                    <div className="current-weather-left-column-icon">
                        <img src={imgWeather} />
                    </div>
                </div>
                <div className="other-countries-left-column">
                    <p className="weather-today-highlight-name">Other Countries</p>
                    <div className="other-countries-left-column-scroll">
                        {
                            countriesList.map((country: any, index: number) => {
                                const imgWeatherCountry: string = `https://openweathermap.org/img/wn/${country.weather[0].icon}@4x.png`;
                                const name = country.name;
                                return (
                                    <div key={index} className="other-countries-left-column-scroll-item" onClick={ () => handleClickCountries(name) }>
                                        <div className="other-countries-left-column-scroll-item-name">
                                            <p>{country.sys.country}</p>
                                            <p className="other-countries-left-column-scroll-item-name-mid">{country.name}</p>
                                            <p>{country.weather[0].description}</p>
                                        </div>
                                        <div className="other-countries-left-column-scroll-item-img">
                                            <img src={imgWeatherCountry} />
                                        </div>
                                        <div className="other-countries-left-column-scroll-item-temp">
                                            <p>{Math.floor(country.main.temp_max)}°</p>
                                            <p>/{Math.floor(country.main.temp_min)}°</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="other-countries-left-column-scroll-item">
                            <div className="other-countries-left-column-scroll-item-name">
                                <p>Australia</p>
                                <p className="other-countries-left-column-scroll-item-name-mid">Canberra</p>
                                <p>sunny</p>
                            </div>
                            <div className="other-countries-left-column-scroll-item-img">
                                <img src="/imgs/sunrise.png" />
                            </div>
                            <div className="other-countries-left-column-scroll-item-temp">
                                <p>32°</p>
                                <p>/24°</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>


            <div className="weather-current-content-right-column">
                <div className="weather-today-highlight">
                    <p className="weather-today-highlight-name">Today's Hightlight</p>
                    <div className="weather-today-highlight-boxs">
                        <div className="weather-today-highlight-box-smalls">   
                            <div className="weather-today-highlight-box-smalls-name">
                                <FiWind 
                                    fontSize={20}
                                />
                                <p>Wind Status</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-mid">
                                <p>{windSpeedKmh} km/h</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-end">
                                <p>{hours}:{minutes}</p>
                            </div>
                        </div>
                        <div className="weather-today-highlight-box-smalls">
                            <div className="weather-today-highlight-box-smalls-name">
                                <WiHumidity 
                                    fontSize={20}
                                />
                                <p>Humidity</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-mid">
                                <p>{humidity}%</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-end">
                                <p>{humidityStatus}</p>
                            </div>
                        </div>
                        <div className="weather-today-highlight-box-bigs">
                            <div className="weather-today-highlight-box-bigs-img">
                                <img src="/imgs/sunrise.png" />
                            </div>
                            <div className="weather-today-highlight-box-bigs-name">
                                <p>Sunrise</p>
                                <p>{sunriseTime}</p>
                            </div>
                        </div>
                        <div className="weather-today-highlight-box-smalls">
                            <div className="weather-today-highlight-box-smalls-name">
                                <TbUvIndex
                                    fontSize={20}
                                />
                                <p>UV Index</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-mid">
                                <p>{uv} uv</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-end">
                                <p>{level} UV</p>
                            </div>
                        </div>
                        <div className="weather-today-highlight-box-smalls">
                            <div className="weather-today-highlight-box-smalls-name">
                                <MdOutlineVisibility
                                    fontSize={20}
                                />
                                <p>Visibility</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-mid">
                                <p>{visibility} km</p>
                            </div>
                            <div className="weather-today-highlight-box-smalls-name-end">
                                <p>{hours}:{minutes}</p>
                            </div>
                        </div>
                        <div className="weather-today-highlight-box-bigs">
                            <div className="weather-today-highlight-box-bigs-img">
                                <img src="/imgs/sunset.png" />
                            </div>
                            <div className="weather-today-highlight-box-bigs-name">
                                <p>Sunset</p>
                                <p>{sunsetTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weather-forecast-right-column">
                    <p className="weather-today-highlight-name">Forecast</p>
                    <div className="weather-forecast-right-column-list">
                        {
                            listForecastWeather.map((list: any, index: number) => {
                                const dtForecast = new Date(list.dt * 1000);
                                const dayForecast = daysOfWeek[dtForecast.getUTCDay()];
                                const dateStr = dtForecast.toISOString().split("T")[0]; 
                                const imgWeatherForecast: string = `https://openweathermap.org/img/wn/${list.weather[0].icon}@4x.png`;
                                
                                const url:string = `/forecast-weather?date=${dateStr}`;
                                return (
                                    <div key={index} className="weather-forecast-right-column-item">
                                        <Link to={url}>
                                            <div className="weather-forecast-right-column-item-day">
                                                {dayForecast}
                                            </div>
                                            <div className="weather-forecast-right-column-item-line"></div>
                                            <div className="weather-forecast-right-column-item-img">
                                                <img src={imgWeatherForecast} />
                                            </div>
                                            <p className="weather-forecast-right-column-item-temp">{Math.floor(list.main.temp)}°C</p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(CurrentweatherPageContent)
