import { useNavigate } from "react-router-dom";
import { TProductCard } from "./productCard.type";

const ProductsCard = ({ product }: { product: TProductCard }) => {
  const navigate = useNavigate();
  const { name, brand, price, type, description, _id } = product;
  const handleViewDetail = (id: string) => {
    navigate(`/products/${id}`);
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p>{brand}</p>
        <p>{type}</p>
        <p>{price} Taka</p>
        <div className="card-actions">
          <button
            onClick={() => handleViewDetail(_id)}
            className="btn btn-primary"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
