import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Testimonials from "../components/Testimonials";

<link href="/src/App.css" rel="stylesheet"></link>
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;