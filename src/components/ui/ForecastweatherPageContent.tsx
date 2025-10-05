import { memo, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiWind } from "react-icons/fi";
import { MdOutlineVisibility } from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { Link, useLocation } from "react-router";

interface UVResult {
  uv: number;
  level: string;
}

function ForecastweatherPageContent(
    { cityName, data, countriesData, setCityName, forecastData }: 
    { cityName: string, data: any, countriesData: any, setCityName: any, forecastData: any }
) {

    const { lat } = data.coord;

    const countryName:string = data.sys.country;
    const sunrise: number = data.sys.sunrise;
    const sunset: number = data.sys.sunset;

    const daysOfWeek: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const forecastDay = params.get("date");

    const listForecastWeather = forecastData.list.filter((data: any) => data.dt_txt.includes("12:00:00"));
    const listForecastDay: any = forecastData.list.filter((data: any) => data.dt_txt.includes(forecastDay));

    const [leftDot, setLeftDot] = useState<number>(0);
    const [rightDot, setRightDot] = useState<number>(0);

    function handleScrollLeftDot(e: React.UIEvent<HTMLDivElement>) {
        const target = e.currentTarget; // div scroll
        const scrollLeft = target.scrollLeft; // vị trí scroll ngang
        const width = target.clientWidth; // chiều rộng của 1 trang (1 item full)

        // Tính index dựa trên vị trí scroll
        const index = Math.round(scrollLeft / width);

        setLeftDot(index); // lưu index hiện tại
    }

    function handleScrollRightDot(e: React.UIEvent<HTMLDivElement>) {
        const target = e.currentTarget; // div scroll
        const scrollLeft = target.scrollLeft; // vị trí scroll ngang
        const width = target.clientWidth; // chiều rộng của 1 trang (1 item full)

        // Tính index dựa trên vị trí scroll
        const index = Math.round(scrollLeft / width);

        setRightDot(index); // lưu index hiện tại
    }
    
    return (
        <div id="weather-current-content">
            <div className="weather-current-content-left-column">
                <div className="forecast-weather-left-column-container">
                    <div 
                        className="forecast-weather-left-column-scroll"
                        onScroll={ handleScrollLeftDot }
                    >
                        {
                            listForecastDay.map((data: any, index: number) => {
                                const days = new Date(data.dt_txt);

                                const date = days.getDate();
                                const month = days.getMonth();
                                const year = days.getFullYear();

                                const dtForecast = new Date(data.dt * 1000);
                                const day = daysOfWeek[dtForecast.getUTCDay()];
                                const feelLike:number = Math.floor(data.main.feels_like);

                                const imgWeather:string = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

                                return (
                                    <div key={index} className="forecast-weather-left-column">
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
                                                <p>{Math.floor(data.main.temp_max)}°C</p>
                                                <p>/{Math.floor(data.main.temp_min)}°C</p>
                                            </div>
                                            <div className="current-weather-left-column-temp-weather">
                                                <p>{data.weather[0].description}</p>
                                                <p>Feels like {feelLike}</p>
                                            </div>
                                        </div>
                                        <div className="current-weather-left-column-icon">
                                            <img src={imgWeather} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="forecast-weather-left-column">
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
                        </div> */}
                    </div>
                    <div className="forecast-weather-left-column-dot">
                        {
                            listForecastDay.map((_: any, index: number) => {
                                return (
                                    <div className={`dot ${leftDot === index ? 'active' : ''}` }></div>
                                )
                            })
                        }
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
                    </div>
                </div>
            </div>


            <div className="weather-current-content-right-column">
                <div className="weather-today-highlight">
                    <p className="weather-today-highlight-name">Today's Hightlight</p>
                    <div className="weather-today-highlight-boxs-dot">
                        <div
                            className="weather-today-highlight-boxs-scroll"
                            onScroll={ handleScrollRightDot }
                        >
                            {
                                listForecastDay.map((data: any, index: number) => {
                                    const days = new Date(data.dt_txt);
                                    console.log(days);
                                    

                                    const hours: string = days.getUTCHours().toString();
                                    const minutes: string = days.getUTCMinutes().toString();
                                    const visibility = (data.visibility / 1000).toFixed(1); 

                                    const humidity = data.main.humidity;

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

                                    function estimateUV(weatherData: any): UVResult {
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

                                    return (
                                        <div key={index} className="weather-today-highlight-boxs-forecast">
                                            <div className="weather-today-highlight-box-smalls">   
                                                <div className="weather-today-highlight-box-smalls-name">
                                                    <FiWind
                                                        fontSize={20}
                                                    />
                                                    <p>Wind Status</p>
                                                </div>
                                                <div className="weather-today-highlight-box-smalls-name-mid">
                                                    <p>{data.wind.speed} km/h</p>
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
                                    )
                                })
                            }
                            {/* <div className="weather-today-highlight-boxs-forecast">
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
                            </div> */}
                        </div>
                        <div className="forecast-weather-right-column-dot">
                            {
                                listForecastDay.map((_: any, index: number) => {
                                    return (
                                        <div className={`dot ${rightDot === index ? 'active' : ''}` }></div>
                                    )
                                })
                            }
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

export default memo(ForecastweatherPageContent)
