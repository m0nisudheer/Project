
"use client"; 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    console.log('Login Data Submitted: ', loginData);

    const mutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          msg
          token
          user  
          role
          userName
        }
      }
    `;

    const variables = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.data && result.data.login) {
          const { token, user, role, userName } = result.data.login; // Destructure userName
          console.log('Success:', result.data);

          // Store the authToken, userId, role, and userName in session storage
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('userId', user);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('userName', userName);  // Store the username

          alert('Login Successful');
          router.push("/dashboard");

      } else {
        const errorMsg = result.errors ? result.errors[0].message : 'An unknown error occurred';
        setError(errorMsg);
        console.error('GraphQL error:', errorMsg);
      }
    } catch (error) {
      alert('Network error: ' + error.message); 
      console.error('Network error:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} autoComplete='off'>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button 
              type="submit" 
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Don't have an account? Sign up link */}
        <p className="text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
