import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${user?.token}` }, // Check if user and token exist
          }
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data.");
      }
    };

    if (user && user.token) {
      fetchProfile();
    } else {
      setError("No valid token found.");
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profileData.name}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      {/* Add more profile fields as required */}
    </div>
  );
};

export default Profile;
