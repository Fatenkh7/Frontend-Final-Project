import axiosClient from "./apiClient";

export const addQuestion = async (question) => {
    const authToken = localStorage.getItem('token');
    try {
        const response = await axiosClient.post('/question/add', question, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return { response: response, error: null };
    } catch (error) {
        return { response: null, error: error.response.data };
    }
};
