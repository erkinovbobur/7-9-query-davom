import React from 'react';
import { Outlet } from 'react-router-dom';
import { useProfileQuery } from '../../redux/api/profileApi';

const Profile = () => {
  const { data } = useProfileQuery();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      {data && data.payload && (
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={data.payload.photo_url} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.payload.username}</h1>
              <p className="text-lg text-gray-600">{data.payload.first_name} {data.payload.last_name}</p>
              <p className="text-gray-500">{data.payload.email}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
            <p className="text-gray-700 mt-2">{data.payload.bio || 'No bio available'}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <p className="text-gray-700 mt-2">Phone: {data.payload.phone || 'Not provided'}</p>
            <p className="text-gray-700">Website: <a href={data.payload.website} className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">{data.payload.website || 'Not available'}</a></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <ul className="list-disc list-inside mt-2">
              {data.payload.activities && data.payload.activities.length > 0 ? (
                data.payload.activities.map((activity, index) => (
                  <li key={index} className="text-gray-700">{activity}</li>
                ))
              ) : (
                <li className="text-gray-500">No recent activities</li>
              )}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Profile;
