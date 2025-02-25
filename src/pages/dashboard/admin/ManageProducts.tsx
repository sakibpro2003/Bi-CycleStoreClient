import { useState } from "react";
import { useGetAllproductsQuery, useDeleteProductMutation } from "../../../redux/features/products/products";

const ManageProducts = () => {
  const { data, error, isLoading, refetch } = useGetAllproductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct).unwrap();
        setSelectedProduct(null); // Close modal after deletion
        refetch(); // Refetch products to update the list
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching products</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Products</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">In Stock</th>
              <th className="p-3">Update</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product, index) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">{product.type}</td>
                <td className="p-3 font-semibold text-green-600">${product.price}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">
                  <span className={`badge ${product.inStock ? "badge-success" : "badge-error"}`}>
                    {product.inStock ? "Available" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-3 text-gray-600">
                  <button className="btn btn-sm btn-primary">Update</button>
                </td>
                <td className="p-3 text-gray-600">
                  <button 
                    className="btn btn-sm btn-error" 
                    onClick={() => setSelectedProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
            <p className="py-4">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedProduct(null)}>Cancel</button>
              <button className="btn btn-error" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
