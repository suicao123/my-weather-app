import { memo } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import HomePageContent from "../ui/HomePageContent";

function HomePage() {
    return (
        <>
            <Header />
            <HomePageContent />
            <Footer />
        </>
    )
}

export default memo(HomePage)
