import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-7xl bg-white  rounded-lg p-10 md:p-16">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">
          About <span className="text-primary">Our Bicycle Shop</span>
        </h1>

        <p className="text-lg text-gray-700 text-center mb-8">
          Welcome to <strong>Bi-CycleStore</strong>, your one-stop
          destination for high-quality bicycles and accessories. Whether you're
          a professional cyclist or a casual rider, we provide the best
          selection for all terrains and styles.
        </p>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              🚀 Our Mission
            </h2>
            <p className="text-gray-700">
              Our mission is to inspire and empower people to enjoy cycling by
              offering premium bicycles, excellent service, and a strong riding
              community.
            </p>
          </div>

          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              🌎 Our Vision
            </h2>
            <p className="text-gray-700">
              We envision a world where cycling is the top choice for
              transportation, fitness, and adventure—creating healthier
              lifestyles and greener cities.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
            Why Choose <span className="text-primary">Us?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3">
                🏆 Top-Quality Bicycles
              </h3>
              <p className="text-gray-700">
                We provide the best brands, ensuring top performance, comfort,
                and durability for every ride.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3">
                💡 Expert Guidance
              </h3>
              <p className="text-gray-700">
                Our experienced team helps you find the perfect bicycle,
                tailored to your needs and preferences.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3">
                🚴 Community & Events
              </h3>
              <p className="text-gray-700">
                Join our cycling community, participate in events, and be part
                of an exciting biking lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Store Information */}
        <div className="mt-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Our Store
          </h2>
          <p className="text-xl text-gray-700">
            <strong>
              Store Address: 🚲 Cycle World BD  House #12, Road #5, Sector
              #7  Uttara, Dhaka-1230, Bangladesh
              <br /> 📞 Phone: +880 1712-345678 ✉️
              Email: support@cycleworldbd.com
            </strong>{" "}
            – Open daily from <strong>9 AM - 8 PM</strong>.
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Need help? Call us at{" "}
            <span className="text-primary font-semibold">+8801700000000</span>
            or email{" "}
            <span className="text-primary font-semibold">
              sakibprodhan2003@gmail.com
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
