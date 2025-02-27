import { useState } from "react";
import ProductsCard from "../../../components/ProductsCard";
import { useGetAllproductsQuery } from "../../../redux/features/products/products";
import { TUpdateProduct } from "../admin/types/productUpdate.types";

const Products = () => {
  const { data } = useGetAllproductsQuery(undefined);
  const products = data?.data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="max-w-11/12 mb-12 mx-auto flex flex-col items-center">
      <h2 className="text-black mb-10 text-3xl font-bold border-yellow-300 pb-2">
        Explore Our Premium Bicycles
      </h2>
      
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-10">
        {currentProducts.map((product: TUpdateProduct) => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center space-x-2">
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
              currentPage === i + 1 ? "bg-yellow-400 text-white" : "bg-gray-200 text-black"
            } hover:bg-yellow-400`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
