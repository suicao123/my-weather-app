import { memo, useRef } from "react"
import { FaTemperatureHigh, FaWind } from "react-icons/fa"
import { FaShield } from "react-icons/fa6"
import { GrLinkNext, GrNext } from "react-icons/gr"
import { IoMdMail } from "react-icons/io"
import { MdWaterDrop } from "react-icons/md"
import { SiGnuprivacyguard } from "react-icons/si"
import { Link } from "react-router"

function HomePageContent() {

    const inputName = useRef<HTMLInputElement>(null);

    function handleClick() {
        localStorage.setItem('cityName', inputName.current?.value ?? '');
    }

    return (
        <div id="home-page">
            <div className="banner-home-page">
                <p>Stay Update with WeatherHub</p>
                <p>Real-time weather data at your fingertips</p>

                <div className="sreach-home-page">
                    <div className="sreach-item-home-page">
                        <p>Location</p>
                        <input 
                            ref={inputName}
                            type="text"
                            placeholder="Enter your city name"
                        />
                    </div>

                    <div 
                        onClick={ handleClick }
                        className="sreach-button-home-page"
                    >
                        <Link to="/current-weather">
                            <GrLinkNext 
                                color="#fff"
                                size="20"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            
            <p className="home-page-title">Featured Cities</p>
            <div className="feature-cities">
                <div className="feature-item">
                    <div className="feature-animation feature-item-newyork">
                        <img src="/imgs/feature1.jpg"/>
                        <div className="feature-name-city">
                            New york
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-animation feature-item-losangles">
                        <img src="/imgs/feature2-losangles.jpg"/>
                        <div className="feature-name-city">
                            Los Angleles
                        </div>
                    </div>

                    <div className="feature-animation feature-item-denver">
                        <img src="/imgs/feature3-denver.jpg"/>
                        <div className="feature-name-city">
                            Denver
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-animation feature-item-vungtau">
                        <img src="/imgs/feature4.jpg"/>
                        <div className="feature-name-city">
                            Vung Tau
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-animation feature-item-miami">
                        <img src="/imgs/feature5-miami.jpg"/>
                        <div className="feature-name-city">
                            Miami
                        </div>
                    </div>

                    <div className="feature-animation feature-item-seattle">
                        <img src="/imgs/feature6-seattle.jpg"/>
                        <div className="feature-name-city">
                            Seattle
                        </div>
                    </div>
                </div>
            </div>

            <p className="home-page-title">Popular Weather Insights</p>
            <div className="popular-weather-insights">
                <div className="popular-weather-insights-item">
                    <div className="popular-weather-insights-item-img">
                        <img src="/imgs/insight1-currtentweather.jpg" alt="" />
                        <div className="icon-insights">
                            <FaTemperatureHigh />
                        </div>
                    </div>
                    <div className="popular-weather-insights-item-mid-content">
                        <p>Current Conditions</p>
                        <p>Your City</p>
                    </div>

                    <div className="popular-weather-insights-item-footer-content">
                        <p>Sunny, 75F</p>
                        <GrNext/>
                    </div>
                </div>
                <div className="popular-weather-insights-item">
                    <div className="popular-weather-insights-item-img">
                        <img src="/imgs/insight2-forecast.jpg" alt="" />
                        <div className="icon-insights">
                            <MdWaterDrop />
                        </div>
                    </div>
                    <div className="popular-weather-insights-item-mid-content">
                        <p>Forecast</p>
                        <p>Your City</p>
                    </div>

                    <div className="popular-weather-insights-item-footer-content">
                        <p>Rain expected</p>
                        <GrNext/>
                    </div>
                </div>
                <div className="popular-weather-insights-item">
                    <div className="popular-weather-insights-item-img">
                        <img src="/imgs/insight3-alert.jpg" alt="" />
                        <div className="icon-insights">
                            <FaWind />
                        </div>
                    </div>
                    <div className="popular-weather-insights-item-mid-content">
                        <p>Current Alerts</p>
                        <p>Severe Weather</p>
                    </div>

                    <div className="popular-weather-insights-item-footer-content">
                        <p>Watch issue</p>
                        <GrNext/>
                    </div>
                </div>
                <div className="popular-weather-insights-item">
                    <div className="popular-weather-insights-item-img">
                        <img src="/imgs/insight4-notification.jpg" alt="" />
                        <div className="icon-insights">
                            <FaShield />
                        </div>
                    </div>
                    <div className="popular-weather-insights-item-mid-content">
                        <p>WeatherHub Notifications</p>
                        <p>Stay informed</p>
                    </div>

                    <div className="popular-weather-insights-item-footer-content">
                        <p>Get instant alerts</p>
                        <GrNext/>
                    </div>
                </div>
                <div className="popular-weather-insights-item">
                    <div className="popular-weather-insights-item-img">
                        <img src="/imgs/insight5-signup.jpg" alt="" />
                        <div className="icon-insights">
                            <SiGnuprivacyguard />
                        </div>
                    </div>
                    <div className="popular-weather-insights-item-mid-content">
                        <p>Join WeatherHub</p>
                        <p>Get exclusive updates</p>
                    </div>

                    <div className="popular-weather-insights-item-footer-content">
                        <p>Sign up today!</p>
                        <GrNext/>
                    </div>
                </div>
            </div>

            <div className="subscribe-weatherhub">
                <div className="subscribe-weatherhub-content">
                    <div className="subscribe-weatherhub-content-mail">
                        <IoMdMail 
                            fontSize="50px"
                        />
                        <div className="subscribe-weatherhub-content-mail-ads">
                            <p>Psst!</p>
                            <p>Want the lastest weather updates? Join WeatherHub for free!</p>
                        </div>
                    </div>

                    <div className="subscribe-weatherhub-content-buttonsubscribe">
                        Subscribe Now
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(HomePageContent)
