import { useEffect } from "react";
import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Newsletter from "../components/Newsletter";
import OfferSection from "../components/OfferSection";
import Testimonials from "../components/Testimonials";
import BlogList from "./BlogList";

<link href="/src/App.css" rel="stylesheet"></link>
const Home = () => {
    useEffect(() => {
        document.title = "User Management | MediMart";
      }, []);
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <OfferSection></OfferSection>
            <BlogList></BlogList>
            <Newsletter></Newsletter>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;