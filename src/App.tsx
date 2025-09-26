
import { Route, Routes } from "react-router"
import "./App.css"
import HomePage from "./components/pages/HomePage"
import CurrentweatherPage from "./components/pages/CurrentweatherPage"
import ForecastweatherPage from "./components/pages/ForecastweatherPage"

function App() {
    return (
        <>
            <Routes>
                <Route 
                    path="/" 
                    element= {<HomePage />}
                />
                <Route 
                    path="/current-weather" 
                    element= {<CurrentweatherPage />}
                />
                <Route 
                    path="/forecast-weather" 
                    element= {<ForecastweatherPage />}
                />
            </Routes>
        </>
    )
}

export default App
