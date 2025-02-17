import { useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/products";

const BikeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductsQuery(id);

  // Ensure data exists before destructuring, fallback to an empty object
  const {
    name,
    brand,
    description,

    price,
    quantity,
    type,
    image,
  } = data?.data || {};

  let inStock;
  if (quantity > 0) {
    inStock = true;
  } else {
    inStock = false;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold text-xl py-10">
        Failed to load bike details. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-screen max-h-screen bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src={image}
                alt={name}
                className="w-full max-w-lg rounded-lg shadow-lg"
              />
            </div>

            {/* Bike Details */}
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                {name}
              </h1>
              <p className="text-lg text-gray-700 mb-4">{description}</p>

              <div className="grid grid-cols-2 gap-4 text-lg">
                <p className="font-semibold">
                  <span className="text-gray-600">Price:</span>{" "}
                  <span className="text-green-600">{price} Taka</span>
                </p>
                <p className="font-semibold">
                  <span className="text-gray-600">Type:</span> {type}
                </p>
                <p className="font-semibold">
                  <span className="text-gray-600">Brand:</span> {brand}
                </p>
                <p
                  className={`font-semibold ${
                    inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </p>
                <p className="font-semibold">
                  <span className="text-gray-600">Available:</span> {quantity}
                </p>
              </div>

              {/* Call-to-action Button */}
              <button className="mt-6 w-full btn text-lg">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
