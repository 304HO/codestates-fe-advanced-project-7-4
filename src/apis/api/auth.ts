import axiosApi from "../utils";

type LoginType = {
  id: string;
  password: string;
};

const authApi = {
  login: async ({ id, password }: LoginType) => {
    if (id === "alyce" && password === "alyce123") {
      return true;
    }
    return false;
  },
};

export default authApi;
