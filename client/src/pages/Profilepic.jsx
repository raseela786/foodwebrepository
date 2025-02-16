import { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosinstance';


const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/userProfile'); // Using axiosInstance to fetch profile
        setUser(response.data.data); // Assuming the response contains the user's profile data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, loading, error };
};

export default useUserProfile;
