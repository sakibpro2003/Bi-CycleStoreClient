import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeUserStatus: builder.mutation({
      query: (requestData) => {
        // Extract token before returning the query object
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/admin/change-user-status",
          method: "PUT",
          body: requestData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getAllUser: builder.query({
      query: () => {
        // Extract token before returning the query object
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/admin/get-all-user",
          method: "GET",
          // body: orderData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useGetAllUserQuery ,useChangeUserStatusMutation} = adminApi;
