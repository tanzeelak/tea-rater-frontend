import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = async (username: string) => {
  return axios.post(`${API_BASE_URL}/login`, { name: username });
};

export const logoutUser = async () => {
  return axios.post(`${API_BASE_URL}/logout`);
};

export const registerUser = async (username: string) => {
  return axios.post(`${API_BASE_URL}/register-user`, { name: username });
};

export const getTeas = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teas?user_id=${userId}`);
    console.log('Tea response:', response);
    // Ensure we're returning an array
    return {
      data: Array.isArray(response.data) ? response.data : []
    };
  } catch (error) {
    console.error('Error in getTeas:', error);
    return { data: [] };
  }
};

export const getAllTeas = () => {
  return axios.get(`${API_BASE_URL}/all-teas`);
};

export const registerTea = async (teaName: string, provider: string, source?: string) => {
  return axios.post(`${API_BASE_URL}/register-tea`, {
    tea_name: teaName,
    provider,
    source: source || ""
  });
};

export const getRatings = async () => {
    return axios.get(`${API_BASE_URL}/ratings`);
};

export const getUserRatings = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-ratings/${userId}`);
    console.log('Ratings response:', response);
    // Ensure we're returning an array
    return {
      data: Array.isArray(response.data) ? response.data : []
    };
  } catch (error) {
    console.error('Error in getUserRatings:', error);
    return { data: [] };
  }
};

export const getUser = async (userId: number) => {
    return axios.get(`${API_BASE_URL}/user/${userId}`);
};

export const submitRating = async (ratingData: object) => {
  return axios.post(`${API_BASE_URL}/submit`, { ...ratingData });
};

export const editRating = async (ratingId: number, ratingData: object) => {
  return axios.put(`${API_BASE_URL}/ratings/${ratingId}`, { ...ratingData });
};

export const getSummary = async () => {
  return axios.get(`${API_BASE_URL}/summary`);
};

export const getAdminData = async (token: string) => {
  return axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: token },
  });
};

export const createTasting = async (name: string) => {
  return axios.post(`${API_BASE_URL}/create-tasting`, { name });
};

export const getTastings = async () => {
  return axios.get(`${API_BASE_URL}/tastings`);
};
