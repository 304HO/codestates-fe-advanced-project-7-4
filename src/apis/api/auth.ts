import { toast } from "react-toastify";
import axiosApi from "../utils";

function CustomException(message: string) {
  const error = new Error(message);
  return error;
}

type LoginType = {
  id: string;
  password: string;
};

const authApi = {
  login: async ({ id, password }: LoginType) => {
    if (id === "alyce" && password === "alyce123") {
      toast.success("Login success");
      return true;
    }
    toast.error("ID or Password do not match.");
    throw CustomException("ID or Password do not match.");
  },
};

export default authApi;
