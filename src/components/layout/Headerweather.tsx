import { memo, useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { IoMdHome } from "react-icons/io"
import { Link } from "react-router";

function Headerweather( { cityName, setCityName }: {cityName: string, setCityName: React.Dispatch<React.SetStateAction<string>>} ) {

    const [name, setName] = useState<string>(cityName);

    useEffect(()=> {
        setName(cityName);
    }, [cityName]);

    function handleChange(e: any) {
        setName(e.target.value);
    }

    function handleCityName() {
        setCityName(name);
        localStorage.setItem('cityName', name);
    }
    
    return (
        <header id="header-weather">
            <div className="header-weather-left">
                <Link to="/">
                    WeatherHub
                </Link>
            </div>
            <div className="header-weather-right">
                <div className="header-weather-right-input">
                    <div 
                        className="header-weather-right-icon-search"
                        onClick={ handleCityName }
                    >
                        <FiSearch
                            size={36}
                        />
                    </div>
                    <input 
                        type="text" 
                        size={30}
                        placeholder="Sreach your location"
                        color="#9CA3AF"
                        width={30}
                        value={name}
                        onChange={ handleChange }
                    />
                </div>
                <IoMdHome 
                    fontSize={50}
                />
            </div>
        </header>
    )
}

export default memo(Headerweather)
