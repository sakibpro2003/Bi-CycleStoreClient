const Banner = () => {
  return (
    <div className="relative w-11/12 mx-auto bg-white h-[80vh] flex items-center justify-center bg-gradient-to-r from-black/50 to-gray-900/50 text-white">/
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co.com/0jkjTyBh/pexels-pixabay-248547.jpg')] bg-cover bg-center blur-sm opacity-40"></div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-5xl font-extrabold leading-tight md:text-6xl drop-shadow-md">
           The Ultimate Ride Awaits! 
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light drop-shadow-sm">
          Get <span className="font-semibold text-yellow-400">20% OFF</span> on
          all premium bicycles. Upgrade your ride today and experience
          <span className="font-semibold text-yellow-400">
            {" "}
            unmatched speed, comfort, and durability!
          </span>
        </p>

        <button className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg shadow-lg transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
