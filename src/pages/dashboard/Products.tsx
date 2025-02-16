import ProductsCard from "../../components/ProductsCard";
import { useGetAllproductsQuery } from "../../redux/features/products/products";

const Products = () => {
  const data = useGetAllproductsQuery(undefined);
  // console.log(data.currentData?.data);
  const products = data.currentData?.data;
  console.log(products);
  return (
    <div>
      <h2>Bi-Cycles</h2>
      <div className="grid grid-cols-3">
        {products?.map((product) => (
          <ProductsCard product={product}></ProductsCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
