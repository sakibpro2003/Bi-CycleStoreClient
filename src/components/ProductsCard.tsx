import { useNavigate } from "react-router-dom";
import { TProductCard } from "./productCard.type";

const ProductsCard = ({ product }: { product: TProductCard }) => {
  const navigate = useNavigate();
  const { name, brand, price, type, description, _id } = product;

  const handleViewDetail = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-lg border border-yellow-400">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={name}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center text-black">
        <h2 className="card-title font-bold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="font-semibold">{brand}</p>
        <p className="italic">{type}</p>
        <p className="text-lg font-bold">{price} Taka</p>
        <div className="card-actions">
          <button
            onClick={() => handleViewDetail(_id)}
            className="btn bg-yellow-500 text-black hover:bg-yellow-500 border "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
