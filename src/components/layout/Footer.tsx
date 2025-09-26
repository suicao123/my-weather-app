import { memo } from "react"

function Footer() {
    return (
        <footer id="footer">
            <div className="footer-left">
                <div>
                    <p>WeatherHub</p>
                    <p>Your reliable weather companion since 2013!</p>
                </div>
                <div>WeatherHub A@</div>
            </div>

            <div className="footer-right">
                <p>Support</p>
                <p>FAQs</p>
                <p>Contact Us</p>
                <p>User Guide</p>
                <p>Feedback</p>
            </div>
        </footer>
    )
}

export default memo(Footer)
