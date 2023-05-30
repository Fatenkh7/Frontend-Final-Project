import axiosClient from "./apiClient";

export const userSignIn = async (email, password) => {
  try {
    const response = await axiosClient.post('/user/signin', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return { response: response.data, error: null };
  } catch (error) {
    return { response: null, error: error.response.data };
  }
};

export const createUser = async (first_name, last_name, email, username, password) => {
  try {
    const response = await axiosClient.post("user/signup", {
      first_name,
      last_name,
      email,
      username,
      password,
    });

    return { response: response.data, error: null };
  } catch (error) {
    return { response: null, error: error.response.data };
  }
};
