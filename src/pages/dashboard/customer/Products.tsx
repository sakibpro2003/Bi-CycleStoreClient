import ProductsCard from "../../../components/ProductsCard";
import { useGetAllproductsQuery } from "../../../redux/features/products/products";
import { TUpdateProduct } from "../admin/types/productUpdate.types";

const Products = () => {
  const data = useGetAllproductsQuery(undefined);
  const products = data.currentData?.data;

  console.log(data, "products");

  return (
    <div className="max-w-11/12 mx-auto flex flex-col items-center">
      <h2 className="text-white text-2xl font-bold my-4">Bi-Cycles</h2>
      <div className="grid grid-cols-3 gap-10">
        {products?.map((product: TUpdateProduct) => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
