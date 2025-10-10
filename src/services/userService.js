import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/users`;

const userService = {
  async getProfile(token) {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from userServie",response);
    return response.data;
  },

  async updateProfile(formData, token) {
    const response = await axios.put(
      `${API_URL}/profile-update/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
};

export default userService;
