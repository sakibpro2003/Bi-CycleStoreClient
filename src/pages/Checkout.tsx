/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/products";
import { useMakeOrderMutation } from "../redux/features/orders/ordersApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleProductsQuery(id);
  const [makeOrder,{isLoading}] = useMakeOrderMutation();
  const discount = data?.data?.discount;
// console.log(object)
  // Extract product details
  const name = data?.data?.name;
 
  console.log(data,'proooooduct data')
  let productPrice = data?.data?.price || 0;

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
    if (!data?.data) return;
  
    const price = data.data.price || 0;
    const discount = data.data.discount || 0;
  
    const finalUnitPrice = discount > 0 ? price - (price * discount) / 100 : price;
    const newTotalPrice = formData.quantity * finalUnitPrice;
  
    setTotalPrice(newTotalPrice);
  }, [data, formData.quantity]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };
  
  if(isLoading){
    return  (<div className="w-screen h-screen flex justify-center items-center content-center">
      <Loader></Loader>
    </div>)
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await makeOrder({ ...formData, totalPrice }).unwrap();
      if (response) {
        toast.success("Order placed successfully");
        navigate("/products");
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
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-yellow-300 hover:border-yellow-400 space-y-4"
    >
      <h2 className="text-3xl font-bold text-black text-center  border-yellow-400 pb-2">
        Checkout
      </h2>

      <label className="form-control">
        <span className="label-text text-black font-semibold">
          Product Name
        </span>
        <input
          type="text"
          defaultValue={name}
          className="input input-bordered border-yellow-300 focus:border-yellow-400 text-black"
          readOnly
        />
      </label>

      <label className="form-control">
        <span className="label-text text-black font-semibold">Quantity</span>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input input-bordered border-yellow-300 focus:border-yellow-400 text-black"
          min="1"
          required
        />
      </label>

      <label className="form-control">
        <span className="label-text text-black font-semibold">Total Price</span>
        <input
          type="number"
          value={totalPrice}
          className="input input-bordered border-yellow-300 focus:border-yellow-400 text-black"
          readOnly
        />
      </label>

      <label className="form-control">
        <span className="label-text text-black font-semibold">
          Payment Method
        </span>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="select select-bordered border-yellow-300 focus:border-yellow-400 text-black"
          required
        >
          <option value="bKash">bKash</option>
          <option value="Nagad">Nagad</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Card">Card</option>
        </select>
      </label>

      <label className="form-control">
        <span className="label-text text-black font-semibold">Address</span>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered border-yellow-300 focus:border-yellow-400 text-black"
          required
        />
      </label>

      <label className="form-control">
        <span className="label-text text-black font-semibold">Phone</span>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered border-yellow-300 focus:border-yellow-400 text-black"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg shadow-md border-2 border-yellow-300 hover:border-yellow-400"
      >
        Place Order
      </button>
    </form>
  );
};

export default Checkout;
