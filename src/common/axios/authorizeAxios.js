import axios from 'axios';

const api = axios.create({
  baseURL: 'https://secondhandvinhome.herokuapp.com/api/',
});

export const getRole = async (token) => {
  try {
    const response = await api.get('user/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.roleId;
  } catch (error) {
    throw new Error(error.message);
  }
};
