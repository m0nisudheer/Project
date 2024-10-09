"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
//import axios from 'axios';

// Sign-up form with conditional rendering based on role
const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    userName: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);

    const mutation = `
      mutation SignUp($signUpData: signUpInput!) {
        signUp(signUpData: $signUpData) {
          id
          msg
          role
        }
      }
    `;

    const variables = {
      signUpData: {
        email: values.email,
        userName: values.userName,
        password: values.password,
        role: values.role,
      },
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

      if (response.ok && result.data) {
        alert('User Registered Successfully');
        if (values.role === 'ADMIN') {
           router.push('/login'); // Redirect admin to book creation page
        } else {
           router.push('/login'); // Redirect user to employee view page
         }
      } else {
        const errorMsg = result.errors ? result.errors[0].message : 'An unknown error occurred';
        if (errorMsg === 'User Already Exists') {
          setErrors({ email: errorMsg });
        } else {
          setErrors({ general: errorMsg });
        }
      }
    } catch (error) {
      setErrors({ general: 'Network error: ' + error.message });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <Formik
          initialValues={{
            email: '',
            userName: '',
            password: '',
            role: 'USER',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <p className="text-red-500 text-center mb-4">{errors.general}</p>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-700">Username</label>
                <Field
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="userName" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700">Role</label>
                <Field
                  as="select"
                  name="role"
                  id="role"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${isSubmitting || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;