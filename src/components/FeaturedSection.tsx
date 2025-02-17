import mountain from "../assets/mountain.png";
import roadBike from "../assets/roadBike.png";
import hybridBike from "../assets/hybridBike.png";
import BMXBike from "../assets/BMXBike.png";
import electric from "../assets/electric.png";
import cyclingAccessories from "../assets/cyclingAccessories.png";
const FeaturedSection = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Explore Our Exclusive Bicycles
          </h2>
          <p className="sm:text-xl">
            Discover a variety of bicycles designed for all terrains and riders,
            ensuring quality, comfort, and performance.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div className=" border-2 p-4 rounded-lg">
            <img
              src={mountain}
              alt="Mountain Bike"
              className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Mountain Bikes
            </h3>
            <p className="">
              Conquer rough terrains with our durable and high-performance
              mountain bikes.
            </p>
          </div>
          <div className=" border-2 p-4 rounded-lg">
            <img
              src={roadBike}
              alt="Road Bike"
              className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Road Bikes
            </h3>
            <p className="">
              Speed through city streets with lightweight and aerodynamic road
              bikes.
            </p>
          </div>
          <div className=" border-2 p-4 rounded-lg">
            <img
              src={hybridBike}
              alt="Hybrid Bike"
            className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Hybrid Bikes
            </h3>
            <p className="">
              Perfect for commuting and leisure rides with a balance of comfort
              and speed.
            </p>
          </div>
          <div className=" border-2 p-4 rounded-lg">
            <img
            src={BMXBike}
              alt="BMX Bike"
              className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              BMX Bikes
            </h3>
            <p className="">
              Perform tricks and stunts with our sturdy and agile BMX bikes.
            </p>
          </div>
          <div className=" border-2 p-4 rounded-lg">
            <img
              src={electric}
              alt="Electric Bike"
               className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Electric Bikes
            </h3>
            <p className="">
              Effortless riding with battery-powered assistance for longer
              journeys.
            </p>
          </div>
          <div className=" border-2 p-4 rounded-lg">
            <img
              src={cyclingAccessories}
              alt="Cycling Accessories"
               className="mb-4 w-full h-3/4 object-cover rounded-lg"
            />
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Cycling Accessories
            </h3>
            <p className="">
              Enhance your ride with top-quality helmets, gloves, and gear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
