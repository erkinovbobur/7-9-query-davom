  import { api } from "./index";

  const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
      profile: build.query({
        query: () => ({
          url: "/auth/profile",
        }),
      }),
    }),
  });

  export const { useProfileQuery } = profileApi;
