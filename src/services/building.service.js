import axios from 'axios';

const BASE_URL = 'https://secondhandvinhome.herokuapp.com/api';

export const getBuildings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/building`);
    console.log('response: ', response);
    return response.data.response;
  } catch (error) {
    throw new Error('Failed to fetch buidings');
  }
};

export const createBuilding = async (building) => {
  try {
    const response = await axios.post(`${BASE_URL}/building/create`, {
        buildingName: building,
      attribute: 'Chua co',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create building');
  }
};

export const deleteBuilding = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/building/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete building');
  }
};

export const updateBuilding = async (id, buildingName,attribute) => {
  try {
    await axios.put(`${BASE_URL}/building/update/${id}`,{buildingName: buildingName, attribute: attribute});
  } catch (error) {
    throw new Error('Failed to update building');
  }
};

