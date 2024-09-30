import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setProfileData(response.data);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return <div>{profileData.message}</div>;
};

export default Profile;
