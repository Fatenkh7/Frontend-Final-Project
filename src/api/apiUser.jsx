import axiosClient from "./apiClient";

export const userSignIn = async (email, password) => {
  try {
    const response = await axiosClient.post(
      "user/signin",
      {
        email,
        password,
      }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};

export const createUser = async (first_name,
  last_name,
  email,
  username,
  password,) => {
  try {
    const response = await axiosClient.post(
      "user/signup",
      {
        first_name,
        last_name,
        email,
        username,
        password,
      }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};