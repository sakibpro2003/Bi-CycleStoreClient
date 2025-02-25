import { useState } from "react";
import { useGetAllproductsQuery, useDeleteProductMutation, useCreateProductMutation } from "../../../redux/features/products/products";
import { toast } from "react-toastify";

const ManageProducts = () => {
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const { data, error, isLoading, refetch } = useGetAllproductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    type: "",
    price: "",
    quantity: "",
    description: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalProducts = data?.data?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = data?.data?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct).unwrap();
        setSelectedProduct(null);
        refetch();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleCreateProduct = async () => {
    try {
        const res = await createProduct(newProduct).unwrap();
        console.log(res)
        setIsCreateModalOpen(false);
        setNewProduct({
            name: "",
            brand: "",
            type: "",
            price: "",
            quantity: "",
            description: "",
        });
        if(res.data){
            toast.success("Bi-Cycle created successfully")
        }
        refetch();
    } catch (error) {
        console.error("Error creating product:", error);
    }
};

  if (isLoading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching products</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>+ Add Product</button>
      </div>

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
            {displayedProducts.map((product, index) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{startIndex + index + 1}</td>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button 
          className="btn btn-outline" 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button 
          className="btn btn-outline" 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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

      {/* Create New Product Modal */}
      {isCreateModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <div className="py-4 space-y-3">
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Brand"
                className="input input-bordered w-full"
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              />
              <input
                type="text"
                placeholder="Type"
                className="input input-bordered w-full"
                value={newProduct.type}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleCreateProduct}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
