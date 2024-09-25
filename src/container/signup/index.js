// 'use client';
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';

// const initialValues = {
//   name: '',
//   role: '',
//   email: '',
//   password: ''
// };

// const Form = () => {
//   const router = useRouter();
  
//   const formik = useFormik({
//     initialValues,

//     validationSchema: Yup.object({
//       name: Yup.string().required('Name is required'),
//       role: Yup.string().required('Role is required'),
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required')
//     }),

//     onSubmit: (values, { resetForm }) => {
//       localStorage.setItem('name', values.name);
//       localStorage.setItem('role', values.role);
//       localStorage.setItem('email', values.email);
//       localStorage.setItem('password', values.password);
//       alert('Signup successful');
//       resetForm(); 
//       router.push('/login');
//     }
//   });

//   return (
//     <div className="flex items-center justify-center">
//       <div className="p-5 bg-orange-100 w-full max-w-sm">
//         <form onSubmit={formik.handleSubmit} autoComplete="off" className="space-y-4">
          
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Username:</label>
//             <input 
//               type="text" 
//               name="name" 
//               id="name" 
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-1"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="text-red-900 text-sm">{formik.errors.name}</div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700" htmlFor="role">Role:</label>
//             <select
//               name="role"
//               id="role"
//               onChange={formik.handleChange}
//               value={formik.values.role}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-gray-500"
//             >
//               <option value="" disabled hidden>Select role</option>
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </select>
//             {formik.touched.role && formik.errors.role && (
//               <div className="text-red-900 text-sm">{formik.errors.role}</div>
//             )}
//           </div>

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
//               className="mt-2 block w-full border border-gray-300 rounded-md p-1"
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-900 text-sm">{formik.errors.password}</div>
//             )}
//           </div>

//           <button 
//             type="submit"
//             className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 w-full"
//           >
//             Register
//           </button>
//         </form>

//         {/* <div className="mt-4 text-center">
//           <span className="font-bold text-black">Already have an account? </span>
//           <button 
//             type="button" 
//             onClick={() => router.push('/login')} 
//             className="text-orange-500 font-bold hover:underline"
//           >
//             Login
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Form;

'use client';
import React from 'react';
import DynamicForm from 'express-react-form';
import 'express-react-form/dist/styles.css'; 
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();

  const handleFormSubmit = (values) => {
    localStorage.setItem('name', values.firstName);
    localStorage.setItem('role', values.role);
    localStorage.setItem('email', values.email);
    localStorage.setItem('password', values.password);
    alert('Signup successful');
    router.push('/login');
  };

  const formData = [
    {
      id: 1,
      label: "Name",
      name: "firstName",
      type: "text",
      required: true,
      // displayErrorMessage: true,
    },
    {
      id: 2,
      label: "Role",
      name: "role",
      type: "enum",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      // displayErrorMessage: true,
    },
    {
      id: 3,
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      // displayErrorMessage: true,
    },
    {
      id: 4,
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      // displayErrorMessage: true,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-5 bg-orange-100 w-full max-w-sm shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Signup Form</h1>
        <DynamicForm
          formData={formData}
          onSubmitFun={handleFormSubmit}
          buttonContainerStyles={{ className: 'flex justify-center' }} 
          buttonStyles={{ className: 'bg-orange-500 text-white rounded-lg text-lg w-full py-2' }} 
        />
      </div>
    </div>
  );
};

export default SignupForm;
