"use client"
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      // const token = localStorage.getItem('access_token');
      const fullName = localStorage.getItem('full_name');
      const email = localStorage.getItem('email');
      const useId = localStorage.getItem('user_id');
      // const username = localStorage.getItem('username');

      // If token and user data are available in localStorage, set the userData state
      if (  fullName && email) {
        setUserData({ fullName,email,useId });
      } else {
        // Handle case where token or user data is not available
        console.error('Token or user data not found in localStorage');
      }
    }
  }, []);

  // Render loading state while waiting for user data
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-[120px]   mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-center mb-6">Welcome, {userData.fullName}</h1>
    <div className="grid grid-cols-1 gap-4">
      <div>
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-700">{userData.email}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Username:</p>
        <p className="text-gray-700">{userData.fullName}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">User Id:</p>
        <p className="text-gray-700">{userData.useId}</p>
      </div>
    </div>
  </div>
  );
};

export default ProfilePage;
