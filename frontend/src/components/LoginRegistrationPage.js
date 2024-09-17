import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegistrationPage = ({ userType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    studentId: '',
    collegeName: '',
    clubName: '',
  });
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`;

      // Prepare payload for login or register
      const payload = {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {
          studentId: formData.studentId,
          collegeName: formData.collegeName,
          clubName: formData.clubName,
        } : {
          studentId: formData.studentId,
          collegeName: formData.collegeName,
          clubName: formData.clubName,
        }),
        userType,
      };

      const response = await axios.post(apiUrl, payload);
      setMessage(response.data.message || 'Success!');

      // Handle success (e.g., saving token to localStorage, redirect)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // Redirect based on userType after login
        switch (userType) {
          case 'student':
            navigate('/student-community');
            break;
          case 'college':
            navigate('/college-community');
            break;
          case 'clubHead':
            navigate('/club-community');
            break;
          default:
            navigate('/'); // Redirect to default page if userType is invalid
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-10 max-w-md w-full text-white">
        {/* Toggle switch for Login and Register */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-lg font-bold ${isLogin ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-lg font-bold ${!isLogin ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Register
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h2>

        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional fields based on userType for registration */}
          {!isLogin && userType === 'student' && (
            <div className="mb-4">
              <label className="block text-gray-400">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {!isLogin && userType === 'college' && (
            <div className="mb-4">
              <label className="block text-gray-400">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {!isLogin && userType === 'clubHead' && (
            <div className="mb-4">
              <label className="block text-gray-400">Club Name</label>
              <input
                type="text"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Additional fields for login based on userType */}
          {isLogin && userType === 'student' && (
            <div className="mb-4">
              <label className="block text-gray-400">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {isLogin && userType === 'college' && (
            <div className="mb-4">
              <label className="block text-gray-400">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {isLogin && userType === 'clubHead' && (
            <div className="mb-4">
              <label className="block text-gray-400">Club Name</label>
              <input
                type="text"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <span className="text-gray-400">{isLogin ? 'New here?' : 'Already have an account?'}</span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-400 hover:text-blue-500 underline focus:outline-none"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistrationPage;
