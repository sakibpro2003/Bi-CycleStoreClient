import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import OfferSection from "../components/OfferSection";
import Testimonials from "../components/Testimonials";
import Blog from "./Blog";

<link href="/src/App.css" rel="stylesheet"></link>
const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <OfferSection></OfferSection>
            <Blog></Blog>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;