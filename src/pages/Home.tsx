import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import OfferSection from "../components/OfferSection";
import Testimonials from "../components/Testimonials";

<link href="/src/App.css" rel="stylesheet"></link>
const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <OfferSection></OfferSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;