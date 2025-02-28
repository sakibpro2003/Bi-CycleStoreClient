import mountain from "../assets/mountain.png";
import roadBike from "../assets/roadBike.png";
import hybridBike from "../assets/hybridBike.png";
import BMXBike from "../assets/BMXBike.png";
import electric from "../assets/electric.png";
import cyclingAccessories from "../assets/cyclingAccessories.png";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="mx-auto max-w-screen-xl">
        {/* Heading Section */}
        <div className="max-w-screen-md text-center mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            <span className="text-yellow-400">Explore</span> Our Exclusive Categories
          </h2>
          <p className="sm:text-lg text-gray-600 mt-4">
            Discover a variety of bicycles designed for all terrains and riders,
            ensuring quality, comfort, and performance.
          </p>
        </div>

        {/* Bike Categories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { image: mountain, title: "Mountain Bikes", desc: "Conquer rough terrains with our durable and high-performance mountain bikes." },
            { image: roadBike, title: "Road Bikes", desc: "Speed through city streets with lightweight and aerodynamic road bikes." },
            { image: hybridBike, title: "Hybrid Bikes", desc: "Perfect for commuting and leisure rides with a balance of comfort and speed." },
            { image: BMXBike, title: "BMX Bikes", desc: "Perform tricks and stunts with our sturdy and agile BMX bikes." },
            { image: electric, title: "Electric Bikes", desc: "Effortless riding with battery-powered assistance for longer journeys." },
            { image: cyclingAccessories, title: "Cycling Accessories", desc: "Enhance your ride with top-quality helmets, gloves, and gear." },
          ].map((item, index) => (
            <div key={index} className="border-2 border-yellow-400 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={item.image}
                alt={item.title}
                className="mb-4 w-full h-52 object-cover rounded-lg"
              />
              <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link to="/products">
            <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg shadow-lg transition transform hover:scale-105">
              View All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
