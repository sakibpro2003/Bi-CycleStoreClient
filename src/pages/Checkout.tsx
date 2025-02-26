/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/products";
import { useMakeOrderMutation } from "../redux/features/orders/ordersApi";
import { toast } from "react-toastify";

const Checkout = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductsQuery(id);
  const [makeOrder] = useMakeOrderMutation();

  // Extract product details
  const name = data?.data?.name;
  const productPrice = data?.data?.price || 0;

  // Initialize form data state
  const [formData, setFormData] = useState({
    products: id || "",
    totalPrice: 0,
    quantity: 1,
    paymentMethod: "bKash",
    address: "",
    phone: "",
  });

  // Separate totalPrice state
  const [totalPrice, setTotalPrice] = useState(0);

  // Update totalPrice dynamically
  useEffect(() => {
    setTotalPrice(formData.quantity * productPrice);
  }, [formData.quantity, productPrice]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await makeOrder({ ...formData, totalPrice }).unwrap();
      if(response){
        toast.success("Order placed successfully");

      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Failed to place order. Please try again.";
      toast.error(errorMessage);
      console.error("Error placing order:", err);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Checkout</h2>

      <label className="form-control">
        <span className="label-text">Product Name</span>
        <input
          type="text"
          defaultValue={name}
          className="input input-bordered"
          readOnly
        />
      </label>

      <label className="form-control">
        <span className="label-text">Quantity</span>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input input-bordered"
          min="1"
          required
        />
      </label>

      <label className="form-control">
        <span className="label-text">Total Price</span>
        <input
          type="number"
          value={totalPrice}
          className="input input-bordered"
          readOnly
        />
      </label>

      <label className="form-control">
        <span className="label-text">Payment Method</span>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="bKash">bKash</option>
          <option value="Nagad">Nagad</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Card">Card</option>
        </select>
      </label>

      <label className="form-control">
        <span className="label-text">Address</span>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </label>

      <label className="form-control">
        <span className="label-text">Phone</span>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </label>

      <button type="submit" className="btn btn-primary w-full">
        Place Order
      </button>
    </form>
  );
};

export default Checkout;
