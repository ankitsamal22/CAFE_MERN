import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./profileCoffee.css"// External Coffee Theme CSS

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${user._id}/profile`;
      await axios.post(url, form);
      fetchProfile();
      setError("Profile updated successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <div className="form-group">
          <label>First Name:</label>
          <input
            name="firstName"
            type="text"
            onChange={handleChange}
            defaultValue={profile.firstName}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            name="lastName"
            type="text"
            onChange={handleChange}
            defaultValue={profile.lastName}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            defaultValue={profile.email}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            defaultValue={profile.password}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="submit-btn" onClick={handleSubmit}>
          Update Profile
        </button>
      </div>
    </div>
  );
}
