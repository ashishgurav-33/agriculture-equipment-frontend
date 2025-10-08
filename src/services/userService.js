import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/users`;
const userService = {
  // 🧾 Fetch current user profile
  async getProfile(token) {
    try {
      const response = await axios.get(`${API_URL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      throw error;
    }
  },

  // 🧑‍💻 Update user profile
  async updateProfile(formData, token) {
    try {
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
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      throw error;
    }
  },
};

export default userService;
