import React, { useState, useEffect, useContext } from "react";
import userService from "../services/userService";
import AuthContext from "../context/AuthContext";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  console.log("Current User", currentUser);
  // 🧾 Fetch profile on mount


  const fetchProfile = async () => {
    if (!currentUser || !currentUser.token) {
      setLoading(false);
      return;
    }
    try {

      setLoading(true);
      const response = await userService.getProfile(currentUser.token);


      if (response?.success && response?.profile) {
        setName(response.profile.name || "");
        setEmail(response.profile.email || "");
      } else {
        setError("Failed to load profile.");
      }
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      setError(err.response?.data?.message || "Server error.");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProfile();
  }, [currentUser]);

  // 💾 Update name
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await userService.updateProfile({ name }, currentUser.token);

      if (response?.success) {
        setMessage("✅ Name updated successfully!");
        setCurrentUser((prev) => ({ ...prev, name: response.profile.name }));
      } else {
        setError(response?.message || "Failed to update name.");
      }
    } catch (err) {
      console.error("❌ Error updating name:", err);
      setError(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Update email
  const handleEmailSave = async () => {
    if (!email) {
      setError("Email cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await userService.updateProfile({ email }, currentUser.token);

      if (response?.success) {
        setMessage("✅ Email updated successfully!");
        setCurrentUser((prev) => ({ ...prev, email: response.profile.email }));
        setIsEditingEmail(false);
      } else {
        setError(response?.message || "Failed to update email.");
      }
    } catch (err) {
      console.error("❌ Error updating email:", err);
      setError(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 profile-card" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 text-success fw-bold">My Profile 🧑‍💻</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {message && <div className="alert alert-success text-center">{message}</div>}

        {/* Full Name Form */}
        <form onSubmit={handleNameUpdate}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-4" disabled={loading}>
            {loading ? "⏳ Saving..." : "Save Name"}
          </button>
        </form>

        {/* Email Display / Edit */}
        <div>
          <label className="form-label fw-semibold">Email Address</label>
          {!isEditingEmail ? (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fs-5">{email}</span>
              <button className="btn btn-outline-primary btn-sm" onClick={() => setIsEditingEmail(true)}>
                Edit
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <input
                type="email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => { setIsEditingEmail(false); setEmail(currentUser.email); }} disabled={loading}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleEmailSave} disabled={loading}>
                  {loading ? "⏳ Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
