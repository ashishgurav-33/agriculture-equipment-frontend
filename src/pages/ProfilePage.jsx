import React, { useState, useEffect, useContext } from "react";
import userService from "../services/userService";
import AuthContext from "../context/AuthContext";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🧾 Fetch profile when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!currentUser?.token) {
          setError("User not logged in.");
          return;
        }

        const response = await userService.getProfile(currentUser.token);

        if (response.success && response.profile) {
          setFormData({
            name: response.profile.name || "",
            email: response.profile.email || "",
          });
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [currentUser]);

  // 🧑‍💻 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧾 Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!currentUser?.token) {
        setError("User token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await userService.updateProfile(formData, currentUser.token);

      if (response.success) {
        setMessage("✅ Profile updated successfully!");
        setCurrentUser((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
        }));
      } else {
        setError(response.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err.response?.data?.message || "Server error while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg profile-form-card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 profile-form-title">
                  My Profile 🧑‍💻
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </form>

                {message && (
                  <div className="alert alert-success text-center mt-3">{message}</div>
                )}
                {error && (
                  <div className="alert alert-danger text-center mt-3">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
