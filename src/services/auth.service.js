import axios from 'axios';
import { IPv4 } from 'src/utils/config';

const BASE_URL = `http://${IPv4}:8448/api/v1`;

const authService = {
  login: async (username, password) => {
    console.log("userName: ", username, password)
    try {
      const response = await axios.post(`${BASE_URL}/auth/admin/login`, { username, password });
      console.log(response)
      // const { accessToken } = response.data;
      // localStorage.setItem('access_token', accessToken);
      // return accessToken;
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Đăng nhập không thành công');
    }
  },
  loginGoogle: async (token) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { token: `Bearer ${token}` },
      );
      const { acesstoken } = response.data;
      localStorage.setItem('access_token', acesstoken);
      return acesstoken;
    } catch (error) {
      console.error(error);
      throw new Error('Đăng nhập không thành công');
    }
  },
  getCurrentUser: async (token) => {
    try {
      console.log("token: ", token)
      const response = await axios.get(`${BASE_URL}/user/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("user: ", response)
      const user = response.data;
      if (user.roleId === 'admin') {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        // localStorage.setItem('error', 'Ban khong co quyen vao day');
        return
      }
    } catch (error) {
      console.error(error);
      throw new Error('Không thể lấy user');
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error(error);
      throw new Error('Đăng xuất không thành công');
    }
  },
};

export default authService;
