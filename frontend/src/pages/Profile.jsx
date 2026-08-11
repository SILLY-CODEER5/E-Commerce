import React, { useEffect } from 'react';
import useShopStore from '../store/useShopStore';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const { userData, token, setToken, setCartItems, fetchUserProfile, backendUrl } = useShopStore();
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.success("You're Logged out.");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${backendUrl}/api/v1/user/update-avatar`, formData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchUserProfile(); // Refresh store data
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8 flex justify-center">
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center bg-gray-50 border border-gray-200 p-8 sm:p-12 rounded-lg shadow-sm">
        
        <label htmlFor="avatar-upload" className="relative cursor-pointer mb-6 group">
          {userData.avatar ? (
            <img 
              src={userData.avatar} 
              alt="Profile" 
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-sm border border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full flex items-center justify-center text-5xl sm:text-6xl text-gray-600 font-medium uppercase shadow-sm border border-gray-200">
              {userData.name ? userData.name.charAt(0) : 'U'}
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-medium tracking-wide">EDIT</span>
          </div>

          {uploading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
            </div>
          )}
        </label>
        <input 
          type="file" 
          id="avatar-upload" 
          accept="image/*" 
          className="hidden" 
          onChange={handleImageChange}
          disabled={uploading}
        />
        
        <div className="w-full max-w-md space-y-6 text-gray-700">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-900">Name</span>
            <span className="text-gray-600">{userData.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-900">Email</span>
            <span className="text-gray-600">{userData.email}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={() => navigate('/orders')}
            className="flex-1 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
          >
            MY ORDERS
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 border border-black text-black px-8 py-3 text-sm hover:bg-gray-100 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
