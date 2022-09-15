import AxiosClient from ".";

export const loginUser = async (params) => {
    try {
        const response = await AxiosClient.post('/api/users/login', params);
        return response.data;
    } catch (e) {}
};

export const logOutUser = async () => {
    try {
        const response = await AxiosClient.get('/api/users/logout', {
            withCredentials: true,
            headers: {
                authorization: getItem('token'),
                refreshtoken: getItem('refreshToken'),
            },
        });
        return response.data;
    } catch (e) {}
};
export const auth = async () => {
    try {
        const response = await AxiosClient.get('/api/users/auth', {
            withCredentials: true,
            headers: {
                authorization: getItem('token'),
                refreshtoken: getItem('refreshToken'),
            },
        });
        return response.data;
    } catch (e) {}
};