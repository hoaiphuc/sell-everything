import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/post`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/post/create`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
  
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/post/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};