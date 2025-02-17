import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";

<link href="/src/App.css" rel="stylesheet"></link>
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <button className="btn">Button</button>
        </div>
    );
};

export default Home;