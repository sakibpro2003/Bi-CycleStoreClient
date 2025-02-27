import { useGetOrdersQuery } from "../../../redux/features/orders/ordersApi";
import { TOrderCustomer } from "./types/OrderTypesCustomer";

const ViewOrders = () => {
  const { data, error, isLoading } = useGetOrdersQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-6">
        {/* <h2 className="text-2xl font-bold mb-4 mx-auto bg-red-800">Your Orders</h2> */}
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col space-y-2">
            <span className="loading loading-dots loading-lg bg-yellow-400"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">
        Error loading orders. Please try again.
      </p>
    );
  }

  const orders = data?.data || [];

  return (
    <div className="p-6">
       <div className="flex justify-center items-center mb-4 text-3xl font-bold">
          <div className="flex flex-col space-y-2">
            <h2>Your Orders</h2>
          </div>
        </div>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead>
              <tr className="bg-base-200">
                <th className="p-3">Product Image</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((order: TOrderCustomer) => (
                <tr key={order._id} className="hover">
                  <td className="p-3">{order.image}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.totalPrice} Taka</td>
                  <td className="p-3">
                    <span
                      className={`badge ${
                        order.status == "Pending"
                          ? "badge-warning"
                          : order.status == "Completed"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrders;
