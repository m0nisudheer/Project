// "use client";

// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import FormTable from '../../container/form';

// const Navbar = () => {
//   const router = useRouter();
//   const [role, setRole] = useState(null);
//   const [username, setUsername] = useState('');
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedRole = sessionStorage.getItem('role'); // Change from localStorage to sessionStorage
//       const storedUsername = sessionStorage.getItem('name'); // Change from localStorage to sessionStorage
//       setRole(storedRole);
//       setUsername(storedUsername);

//       // console.log(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear(); // Change from localStorage.clear() to sessionStorage.clear()
//     router.push('/login');
//   };

//   return (
//     <>
//       <nav className="bg-orange-100 text-black p-3">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="flex items-center mb-2 md:mb-0">
//             <div className="text-2xl font-bold">Library</div>
//           </div>
//           {username && (
//             <div className="flex-grow text-center mb-2 md:mb-0">
//               <span className="block text-xl font-bold text-red-500">
//                 Welcome, {username}..!
//               </span>
//               {role && (
//                 <span className="block text-sm text-gray-700">
//                   {role === 'ADMIN' ? 'Logged in as Admin' : 'Logged in as User'} {/* Updated to match your case */}
//                 </span>
//               )}
//             </div>
//           )}
//           <div className="flex items-center gap-4 md:gap-6">
//             {role === 'ADMIN' && ( // Updated to match your case
//               <button
//                 onClick={() => setIsFormOpen(true)}
//                 className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//               >
//                 Add Book
//               </button>
//             )}
//             <button
//               onClick={handleLogout}
//               className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {isFormOpen && <FormTable onClose={() => setIsFormOpen(false)} />}
//     </>
//   );
// };

// export default Navbar;

"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import FormTable from '../../container/form';

const Navbar = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = sessionStorage.getItem('role'); 
      const storedUsername = sessionStorage.getItem('userName'); 
      // const storedUsername = sessionStorage.getItem('userName'); // Retrieve the username
      // setUsername(storedUsername);
      setRole(storedRole);
      setUsername(storedUsername); // Set the username in state

      // console.log(storedUsername);
    }
  }, []);


  const handleLogout = () => {
    sessionStorage.clear(); // Clear sessionStorage on logout
    router.push('/login');
  };

  return (
    <>
      <nav className="bg-orange-100 text-black p-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="text-2xl font-bold">Library</div>
          </div>
          {username ? (
            <div className="flex-grow text-center mb-2 md:mb-0">
              <span className="block text-xl font-bold text-red-500">
                Welcome, {username}..!
              </span>
              {role && (
                <span className="block text-sm text-gray-700">
                  {role === 'ADMIN' ? 'Logged in as Admin' : 'Logged in as User'}
                </span>
              )}
            </div>
          ) : (
            <div className="flex-grow text-center mb-2 md:mb-0">
              <span className="block text-xl font-bold text-red-500">
                Welcome!
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 md:gap-6">
            {role === 'ADMIN' && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Add Book
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {isFormOpen && <FormTable onClose={() => setIsFormOpen(false)} />}
    </>
  );
};

export default Navbar;
