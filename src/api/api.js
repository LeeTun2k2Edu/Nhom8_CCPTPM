import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Thay đổi địa chỉ API tương ứng

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiFunctions = {
    login: (username, password) => api.post('/login', { username, password }).then((response) => response.data),

    signup: (username, password, email, name) =>
        api.post('/signup', { username, password, email, name }).then((response) => response.data),

    userinfo: (username) => api.get(`/user/${username}`).then((response) => response.data),
    // Định nghĩa các hàm gọi API khác tại đây
};

export default apiFunctions;
