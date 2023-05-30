import axiosClient from "./apiClient";
export const createMessage = async (first_name, last_name, email, message) => {
    try {
        const response = await axiosClient.post("contact", {
            first_name,
            last_name,
            email,
            message,
        });

        return { response: response.data, error: null };
    } catch (error) {
        return { response: null, error: error.response.data };
    }
};