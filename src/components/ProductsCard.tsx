
// brand

// "SpeedX"
// description
// : 
// "A lightweight road bike with a carbon fiber frame and Shimano gears."
// inStock
// : 
// true
// name
// : 
// "SpeedX Roadster"
// price
// : 
// 1200
// quantity
// : 
// 10
// type
// : 
// "Road"
// _id
// : 
// "67b04c73b4831f5bd3da23ab"
const ProductsCard = ({ product }) => {
    const {name,brand,price,inStock,type,description,} = product
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
        <p>{price} Taka</p>
        <div className="card-actions">
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
