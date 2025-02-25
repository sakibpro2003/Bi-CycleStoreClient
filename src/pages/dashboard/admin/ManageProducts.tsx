// import React, { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import { useDeleteProductMutation, useGetAllproductsQuery, useCreateProductMutation} from "../../../redux/features/products/products";

// const ManageProducts: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const { data, isLoading, refetch } = useGetAllproductsQuery(undefined);
//   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
//   const modalRef = useRef<HTMLDialogElement>(null);
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

//   const openModal = (id: string) => {
//     setSelectedProductId(id);
//     modalRef.current?.showModal();
//   };

//   const handleDelete = async () => {
//     if (!selectedProductId) return;
//     try {
//       await deleteProduct(selectedProductId).unwrap();
//       toast.success("Product deleted successfully");
//       refetch();
//     } catch (error) {
//       toast.error("Failed to delete product");
//     }
//     modalRef.current?.close();
//   };

//   if (isLoading) return <p className="text-center">Loading products...</p>;

//   // Pagination logic
//   const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);
//   const paginatedData = data?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between">
//       <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
//       <button className="btn btn-primary">+Add Product</button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Brand</th>
//               <th className="border px-4 py-2">Type</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Quantity</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData?.map((product: any) => (
//               <tr key={product._id}>
//                 <td className="border px-4 py-2">{product.name}</td>
//                 <td className="border px-4 py-2">{product.brand}</td>
//                 <td className="border px-4 py-2">{product.type}</td>
//                 <td className="border px-4 py-2">${product.price}</td>
//                 <td className="border px-4 py-2">{product.quantity}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     onClick={() => openModal(product._id)}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//                     disabled={isDeleting}
//                   >
//                     {isDeleting ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <button
//           className="btn btn-primary mx-2"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             className={`btn mx-1 ${currentPage === index + 1 ? "btn-active" : "btn-secondary"}`}
//             onClick={() => setCurrentPage(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           className="btn btn-primary mx-2"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* DaisyUI Modal */}
//       <dialog ref={modalRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Confirm Deletion</h3>
//           <p className="py-4">Are you sure you want to delete this product?</p>
//           <div className="modal-action">
//             <button className="btn btn-error" onClick={handleDelete}>Delete</button>
//             <button className="btn" onClick={() => modalRef.current?.close()}>Cancel</button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ManageProducts;

import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetAllproductsQuery,
  useCreateProductMutation,
} from "../../../redux/features/products/products";

const ManageProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, refetch } = useGetAllproductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const addProductModalRef = useRef<HTMLDialogElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    type: "Mountain",
    description: "",
    quantity: "",
  });

  const openModal = (id: string) => {
    setSelectedProductId(id);
    modalRef.current?.showModal();
  };

  const openAddProductModal = () => {
    addProductModalRef.current?.showModal();
  };

  const handleDelete = async () => {
    if (!selectedProductId) return;
    try {
      await deleteProduct(selectedProductId).unwrap();
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product");
    }
    modalRef.current?.close();
  };

  const handleCreateProduct = async () => {
    try {
      const res = await createProduct(newProduct).unwrap();
      console.log(res)
      if (res) {
        toast.success("Product added successfully");
      }
      refetch();
      addProductModalRef.current?.close();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  if (isLoading) return <p className="text-center">Loading products...</p>;

  // Pagination logic
  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);
  const paginatedData = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        <button className="btn btn-primary" onClick={openAddProductModal}>
          +Add Product
        </button>
      </div>
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
            {paginatedData?.map((product: any) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.brand}</td>
                <td className="border px-4 py-2">{product.type}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal(product._id)}
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
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-active" : "btn-secondary"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary mx-2"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* DaisyUI Modals */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this product?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn" onClick={() => modalRef.current?.close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog ref={addProductModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Brand"
            className="input input-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            className="input input-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          <select
            className="select select-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, type: e.target.value })
            }
          >
            {["Mountain", "Road", "Hybrid", "BMX", "Electric"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full my-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          ></textarea>
          <button
            className="btn btn-success w-full"
            onClick={handleCreateProduct}
          >
            Add Product
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
