import axiosClient from "./apiClient";

export const userSignIn = async () => {
  try {
    const response = await axiosClient.post(
      "user/signin");

    return { response };
  } catch (err) {
    return { err };
  }
};

