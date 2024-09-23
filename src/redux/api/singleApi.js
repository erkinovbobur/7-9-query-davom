import { api } from "./index";

const singleAi = api.injectEndpoints({
  endpoints: (build) => ({
    singleQuery: build.query({
      query: (id) => ({
        url:"/product/single-product/66a5fe5aef9f646863b22f6f", 
      }),
    }),
  }),
});

export const { useSingleQuery } = singleAi;
