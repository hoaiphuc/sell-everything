import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    console.log('response: ', response);
    return response.data.response;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/category/create`, {
      categoryName: category,
      attribute: 'Chua co',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/category/delete/?id=${id}`);
  } catch (error) {
    throw new Error('Failed to delete category');
  }
};

export const updateCategory = async (id, categoryName,attribute) => {
  try {
    await axios.put(`${BASE_URL}/category/update/${id}`,{categoryName: categoryName, attribute: attribute});
  } catch (error) {
    throw new Error('Failed to update category');
  }
};

