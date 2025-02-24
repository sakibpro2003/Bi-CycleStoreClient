import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: (userCredentials) => {
        const storedAuth = localStorage.getItem("persist:auth");

        let token = "";
        if (!storedAuth) {
          console.error("No auth data found!");
          return;
        }

        // const parsedAuth = JSON.parse(storedAuth);
        // const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        try {
          const storedAuth = localStorage.getItem("persist:auth");
          if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : "";
        console.log(token,"tokennnnnfrom orderapi")

          }
        } catch (error) {
          console.error("Error retrieving auth token:", error);
        }

        return {
          url: "/auth/change-password",
          method: "PUT",
          body: userCredentials,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
