import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllproducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    createProduct: builder.mutation({
      query: (productData) => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: `/products`,
          method: "POST",
          body:productData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({productData,id}) => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: `/products/${id}`,
          method: "PUT",
          body:productData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { 
  useGetAllproductsQuery, 
  useGetSingleProductsQuery, 
  useDeleteProductMutation ,
  useCreateProductMutation,
  useUpdateProductMutation
} = productsApi;

export default productsApi;
