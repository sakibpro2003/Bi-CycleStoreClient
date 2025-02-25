import React from "react";
// import { useGetAllproductsQuery, useDeleteProductMutation } from "../../api/productsApi";
import { toast } from "react-toastify";
import { useDeleteProductMutation, useGetAllproductsQuery } from "../../../redux/features/products/products";

const ManageProducts: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllproductsQuery(undefined
    
  );
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Brand</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product: any) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.brand}</td>
                <td className="border px-4 py-2">{product.type}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;