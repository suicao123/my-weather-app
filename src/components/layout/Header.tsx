import { memo, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router";

function Header() {
    const [menuState, setMenuState] = useState<boolean>(false);

    // function handleClickMenu() {
    //     setMenuState(!menuState);
    // }

    function handleMouseEnter() {
        setMenuState(true);
    }

    function handleMouseLeave() {
        setMenuState(false);
    }

    return (
        <div id="header-fixed">
            <header id="header">
                <p>WeatherHub</p>
                <div className="menu-header">
                    <div 
                        className="icon-menu"
                        //onClick={ handleClickMenu }
                        onMouseEnter={ handleMouseEnter }
                        onMouseLeave={ handleMouseLeave }
                    >
                        <CiMenuBurger />
                    </div>

                    <div 
                        className={`menu-show ${menuState ? "show" : ""}`}
                        onMouseEnter={ handleMouseEnter }
                        onMouseLeave={ handleMouseLeave }
                    >
                        <Link to="/current-weather">
                            <div className="menu-box">Current weather</div>
                        </Link>
                        <Link to="/forecast-weather">
                            <div className="menu-box">5 day weather</div>
                        </Link>
                        <div className="menu-box">notification</div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default memo(Header)
