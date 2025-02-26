import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllOrdersQuery } from "../../../redux/features/admin/adminApi";
import { useChangeOrderStatusMutation, useDeleteOrderMutation } from "../../../redux/features/orders/ordersApi";
import { TOrder } from "./types/order.types";

const ManageOrders = () => {
  const [deleteOrder] = useDeleteOrderMutation();
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [changeOrderStatus, { isLoading: isChangingStatus }] = useChangeOrderStatusMutation();

  const statusTypes = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];
  const modalRef = useRef<HTMLDialogElement>(null);

  if (isLoading) return <p className="text-center text-lg">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching orders</p>;

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      await changeOrderStatus({ orderId, status: { status: newStatus } }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const openDeleteModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    modalRef.current?.showModal();
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) return;
    setLoadingOrderId(selectedOrderId);
    try {
      await deleteOrder(selectedOrderId).unwrap();
      toast.success("Order deleted successfully");
      refetch(); // Refresh the orders list after deletion
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete order");
    } finally {
      setLoadingOrderId(null);
      setSelectedOrderId(null);
      modalRef.current?.close();
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
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order:TOrder, index:string) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  <select
                    onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                    value={order.status}
                    className="select select-bordered"
                    disabled={isChangingStatus}
                  >
                    {statusTypes.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openDeleteModal(order._id)}
                    className="btn btn-sm btn-error"
                    disabled={loadingOrderId === order._id}
                  >
                    {loadingOrderId === order._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete this order?</p>
          <div className="modal-action">
            <button onClick={handleDeleteOrder} className="btn btn-error">
              Confirm
            </button>
            <button onClick={() => modalRef.current?.close()} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageOrders;
