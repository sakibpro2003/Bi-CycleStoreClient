import { useEffect, useState } from "react";
import ProductsCard from "../../../components/ProductsCard";
import { useGetAllproductsQuery } from "../../../redux/features/products/products";
import { TUpdateProduct } from "../admin/types/productUpdate.types";
import Loader from "../../../components/Loader";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");
  const { data, isLoading } = useGetAllproductsQuery(undefined);
  const products = data?.data || [];

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [brand, setBrand] = useState<string>("");

  const [category, setCategory] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  useEffect(() => {
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter products
  let filteredProducts = products.filter(
    (product: TUpdateProduct) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      Number(product.price) <= priceRange &&
      (brand ? product.brand === brand : true) &&
      (category ? product.type === category : true) &&
      (availability
        ? availability === "In Stock"
          ? product.inStock
          : !product.inStock
        : true)
  );

  // Sort products based on price
  if (sortOrder === "Low to High") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sortOrder === "High to Low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center content-center">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="max-w-11/12 mb-12 mx-auto flex flex-col items-center">
      <h2 className="text-black text-center mb-4 lg:mb-10 text-2xl lg:text-3xl font-bold border-yellow-300 pb-2">
        Explore Our Premium Bicycles
      </h2>

      {/* Search Field */}
      <div className="w-4/5 lg:w-1/3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered input-warning w-full"
        />
      </div>

      {/* Filters */}
      <div className="w-4/5 lg:w-1/3 flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex justify-between w-full">
          <p>0</p>
          <p>{priceRange}</p>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="range range-warning"
        />
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="select select-warning"
        >
          <option value="">All Brands</option>
          <option value="Giant">Giant</option>
          <option value="Kona">Kona</option>
          <option value="Marin">Marin</option>
          <option value="Trek">Trek</option>
          <option value="Specialized">Specialized</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-warning"
        >
          <option value="">All Categories</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="select select-warning"
        >
          <option value="">Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-warning"
        >
          <option value="">Sort by</option>
          <option value="Low to High">Price: Low to High</option>
          <option value="High to Low">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {
        currentProducts.length>0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {currentProducts.map((product: TUpdateProduct) => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>
        ):<div className="text-center my-20 text-gray-600">
        <img
          src="https://i.imgur.com/oCkEbrA.png"
          alt="Empty box"
          className="mx-auto w-40 h-40 mb-4"
        />
        <p className="text-xl font-semibold">Oops! Nothing to ride here... 😢</p>
        <p className="text-md">Try adjusting your filters or give your bike dreams another spin!</p>
      </div>
      }

      {/* Pagination */}
      <div className="mt-10 grid grid-cols-4 gap-2 lg:flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-black"
            } hover:bg-yellow-400`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
