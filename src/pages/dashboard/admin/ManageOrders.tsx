// // import { useGetAllOrdersQuery } from "../../../redux/features/admin/adminApi";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useGetAllOrdersQuery } from "../../../redux/features/admin/adminApi";

// const ManageOrders = () => {
//   const { data, error, isLoading, refetch } = useGetAllOrdersQuery(undefined);
//   const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

//   if (isLoading) return <p className="text-center text-lg">Loading orders...</p>;
//   if (error) return <p className="text-center text-red-500">Error fetching orders</p>;

//   const handleUpdateOrder = (orderId: string) => {
//     setLoadingOrderId(orderId);
//     setTimeout(() => {
//       toast.success("Order updated successfully");
//       setLoadingOrderId(null);
//     }, 1000); // Mock API delay
//   };

//   const handleDeleteOrder = (orderId: string) => {
//     setLoadingOrderId(orderId);
//     setTimeout(() => {
//       toast.success("Order deleted successfully");
//       refetch();
//       setLoadingOrderId(null);
//     }, 1000);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Manage Orders</h1>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="p-3">#</th>
//               <th className="p-3">Customer</th>
//               <th className="p-3">Total Price</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data?.map((order, index) => (
//               <tr key={order._id} className="border-b hover:bg-gray-100">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{order.customerName}</td>
//                 <td className="p-3">${order.totalPrice}</td>
//                 <td className="p-3">
//                   <span
//                     className={`badge ${
//                       order.status === "Pending"
//                         ? "badge-warning"
//                         : order.status === "Completed"
//                         ? "badge-success"
//                         : "badge-error"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="p-3 flex gap-3">
//                   <button
//                     onClick={() => handleUpdateOrder(order._id)}
//                     className="btn btn-sm btn-info"
//                     disabled={loadingOrderId === order._id}
//                   >
//                     {loadingOrderId === order._id ? "Updating..." : "Update"}
//                   </button>
//                   <button
//                     onClick={() => handleDeleteOrder(order._id)}
//                     className="btn btn-sm btn-error"
//                     disabled={loadingOrderId === order._id}
//                   >
//                     {loadingOrderId === order._id ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageOrders;

import { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/features/admin/adminApi";

const statusOptions = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

const ManageOrders = () => {
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  console.log(data,"dataaaa")

  if (isLoading) return <p className="text-center text-lg">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching orders</p>;

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoadingOrderId(orderId);
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update order status");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order, index) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  <select
                    className="select select-bordered select-sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={loadingOrderId === order._id}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleStatusChange(order._id, "Cancelled")}
                    className="btn btn-sm btn-error"
                    disabled={loadingOrderId === order._id}
                  >
                    {loadingOrderId === order._id ? "Processing..." : "Cancel Order"}
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

export default ManageOrders;

