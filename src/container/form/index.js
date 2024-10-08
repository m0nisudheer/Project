'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa'; 

const initialValues = {
  title: '',
  author: '',
  year: ''
};

const FormTable = ({ onClose }) => {
  const [zoomClass, setZoomClass] = useState('scale-110 opacity-0');

  useEffect(() => {
    setTimeout(() => {
      setZoomClass('scale-100 opacity-100 transition-transform transition-opacity duration-500');
    }, 100);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      author: Yup.string().required('Author is required'),
      year: Yup.date().typeError('Year must be a valid date').required('Year is required'),
    }),
    onSubmit: (values) => {
      const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
      existingBooks.push(values);
      localStorage.setItem('books', JSON.stringify(existingBooks));
      alert('Book added successfully!');
      formik.resetForm(); 
    }
  });

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${zoomClass}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative p-5 bg-orange-100 rounded-lg shadow-lg w-full max-w-lg">
        <button className="absolute top-2 right-2 text-orange-600" onClick={onClose}>
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Book Details Form</h1>
        <form onSubmit={formik.handleSubmit} autoComplete="off" className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="mt-3 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-900 text-sm">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              onChange={formik.handleChange}
              value={formik.values.author}
              className="mt-3 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.author && formik.errors.author && (
              <div className="text-red-900 text-sm">{formik.errors.author}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Year:</label>
            <input
              type="date"
              name="year"
              id="year"
              onChange={formik.handleChange}
              value={formik.values.year}
              className="mt-3 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.year && formik.errors.year && (
              <div className="text-red-900 text-sm">{formik.errors.year}</div>
            )}
          </div>

          <div className="flex justify-around gap-3">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTable;
