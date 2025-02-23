import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: (orderData) => {
        // Extract token before returning the query object
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("❌ No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/order",
          method: "POST",
          body: orderData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useMakeOrderMutation } = ordersApi;
