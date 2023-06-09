import axiosClient from "./apiClient";
export const createMessage = async (first_name, last_name, email, message) => {
    try {
        const response = await axiosClient.post("/contact/add", {
            first_name,
            last_name,
            email,
            message,
        });

        return { response: response, error: null };
    } catch (error) {
        return { response: null, error: error.response.data };
    }
};