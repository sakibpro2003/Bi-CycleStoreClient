import { useNavigate } from "react-router-dom";
import { TProductCard } from "./productCard.type";

const ProductsCard = ({ product }: { product: TProductCard }) => {
  const navigate = useNavigate();
  const { name, brand, price, image, type, description, _id, discount } =
    product;

  console.log(brand);
  const handleViewDetail = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card w-80 bg-base-100 shadow-lg border-2 border-yellow-300 h-96 ">
      <figure className="px-6 pt-6">
        <img src={image} alt={name} className="rounded-xl h-40 object-cover" />
      </figure>
      <div className="card-body items-center text-center text-black p-4">
        <div className="flex justify-between w-full">
          <h2 className="card-title font-bold text-lg truncate w-full">
            {name}
          </h2>
          {discount > 0 ? (
            <span className= "w-2/5 font-bold bg-red-500 text-white rounded-md px-4">
              {discount} % 
            </span>
          ) : (
            ""
          )}
        </div>
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        <div className="flex gap-3 text-xs">
          <p className="font-semibold">
            <span className="font-bold">Brand:</span> {brand}
          </p>
          <p className="italic">
            <span className="font-bold">Type:</span> {type}
          </p>
        </div>
        <p className="text-md font-bold">{price} Taka</p>
        <div className="card-actions">
          <button
            onClick={() => handleViewDetail(_id)}
            className="btn bg-yellow-500 text-white hover:bg-yellow-500 border text-sm px-4 py-1"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
