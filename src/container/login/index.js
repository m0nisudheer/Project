// 'use client'; 

// import React from 'react';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import * as Yup from 'yup';

// const initialValues = {
//   email: '',
//   password: ''
// };

// const LoginForm = () => {
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues,
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required')
//     }),
    
//     onSubmit: (values, { resetForm }) => {
//       const storedEmail = localStorage.getItem('email');
//       const storedPassword = localStorage.getItem('password');
//       const storedRole = localStorage.getItem('role'); 

//       if (values.email === storedEmail && values.password === storedPassword) {
//         alert('Login Successful');
//         localStorage.setItem('role', storedRole); 
//         resetForm(); 
//         router.push('/dashboard');
//       } else {
//         alert('Invalid email or password');
//       }
//     },
//   });

//   return (
//     <div className="flex items-center justify-center">
//       <div className="p-5 bg-orange-100 w-full max-w-sm">
//         <form onSubmit={formik.handleSubmit} autoComplete="off" className="space-y-4">
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Email:</label>
//             <input 
//               type="email" 
//               name="email" 
//               id="email" 
//               onChange={formik.handleChange}
//               value={formik.values.email}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-1" 
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="text-red-900 text-sm">{formik.errors.email}</div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700">Password:</label>
//             <input 
//               type="password" 
//               name="password" 
//               id="password" 
//               onChange={formik.handleChange}
//               value={formik.values.password}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-1" 
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-900 text-sm">{formik.errors.password}</div>
//             )}
//           </div>

//           <button 
//             type="submit" 
//             className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 w-full"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <span className="font-bold text-black">Don't have an account? </span>
//           <button 
//             type="button" 
//             onClick={() => router.push('/signup')} 
//             className="text-orange-500 font-bold hover:underline"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

'use client';
import React from 'react';
import DynamicForm from 'express-react-form';
import 'express-react-form/dist/styles.css'; 
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const handleFormSubmit = (values) => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedRole = localStorage.getItem('role');

    if (values.email === storedEmail && values.password === storedPassword) {
      alert('Login Successful');
      localStorage.setItem('role', storedRole);
      router.push('/dashboard'); 
    } else {
      alert('Invalid email or password');
    }
  };

  const formData = [
    {
      id: 1,
      label: "Email:",
      name: "email",
      type: "email",
      required: true,
       // displayErrorMessage: true,
    },
    {
      id: 2,
      label: "Password:",
      name: "password",
      type: "password",
      required: true,
      // displayErrorMessage: true,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-5 bg-orange-100 w-full max-w-sm shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <div>
          <DynamicForm
            formData={formData}
            onSubmitFun={handleFormSubmit}
            buttonContainerStyles={{ className: 'flex justify-center' }} 
            buttonStyles={{ className: 'bg-orange-500 text-white rounded-lg text-lg w-full py-2' }} 
          />
        </div>
        <div className="mt-4 text-center">
          <span className="font-bold text-black">Don't have an account? </span>
          <button 
            type="button" 
            onClick={() => router.push('/signup')} 
            className="text-orange-500 font-bold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
