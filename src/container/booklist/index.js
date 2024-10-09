// 'use client';

// import React, { useEffect, useState } from 'react';

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [editIndex, setEditIndex] = useState(-1);
//   const [editedBook, setEditedBook] = useState({ title: '', author: '', year: '' });
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/graphql", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: `
//               query GetBooks {
//                 books {
//                   id
//                   title
//                   author
//                   year
//                 }
//               }
//             `
//           }),
//         });

//         const data = await response.json();
//         if (data.errors) {
//           console.error("GraphQL Error:", data.errors[0].message);
//           alert("Error fetching books: " + data.errors[0].message);
//         } else {
//           setBooks(data.data.books || []);
//         }
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         alert("An error occurred while fetching books.");
//       }
//     };

//     const role = sessionStorage.getItem('role');
//     setUserRole(role);
//     fetchBooks(); // Fetch books from the backend when the component mounts
//   }, []);

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditedBook(books[index]);
//   };

//   const handleSave = async () => {
//     const updatedBooks = [...books];
//     updatedBooks[editIndex] = editedBook;
//     setBooks(updatedBooks);
//     setEditIndex(-1);
//     setEditedBook({ title: '', author: '', year: '' });

//     // Add your update book API call here if needed
//     // Example:
//     // await fetch(`http://localhost:3000/api/graphql`, { ... });
//   };

//   const handleRemove = async (index) => {
//     const bookToRemove = books[index];
//     const updatedBooks = books.filter((_, i) => i !== index);
//     setBooks(updatedBooks);

//     // Add your delete book API call here
//     // Example:
//     // await fetch(`http://localhost:3000/api/graphql`, { ... });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBook({ ...editedBook, [name]: value });
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4 text-center">Books List</h2>
//       {books.length === 0 ? (
//         <div className="text-center text-lg font-semibold">No books available.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-black table-auto md:table-fixed">
//             <thead>
//               <tr className="bg-orange-100">
//                 <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Title</th>
//                 <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Author</th>
//                 <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Year</th>
//                 {userRole !== 'user' && (
//                   <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Actions</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book, index) => (
//                 <tr key={book.id} className="border border-black">
//                   <td className="border border-black p-2 text-center text-lg md:text-xl">
//                     {editIndex === index ? (
//                       <input
//                         type="text"
//                         name="title"
//                         value={editedBook.title}
//                         onChange={handleChange}
//                         className="border border-black rounded-md p-1 w-full text-center"
//                       />
//                     ) : (
//                       book.title
//                     )}
//                   </td>
//                   <td className="border border-black p-2 text-center text-lg md:text-xl">
//                     {editIndex === index ? (
//                       <input
//                         type="text"
//                         name="author"
//                         value={editedBook.author}
//                         onChange={handleChange}
//                         className="border border-black rounded-md p-1 w-full text-center"
//                       />
//                     ) : (
//                       book.author
//                     )}
//                   </td>
//                   <td className="border border-black p-2 text-center text-lg md:text-xl">
//                     {editIndex === index ? (
//                       <input
//                         type="text"
//                         name="year"
//                         value={editedBook.year}
//                         onChange={handleChange}
//                         className="border border-black rounded-md p-1 w-full text-center"
//                       />
//                     ) : (
//                       book.year
//                     )}
//                   </td>
//                   {userRole !== 'user' && (
//                     <td className="border border-black p-2 text-center text-sm">
//                       {editIndex === index ? (
//                         <button
//                           onClick={handleSave}
//                           className="bg-green-500 text-white py-1 w-20 rounded-md"
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEdit(index)}
//                             className="bg-blue-500 text-white py-1 w-20 rounded-md mr-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleRemove(index)}
//                             className="bg-red-500 text-white py-1 w-20 rounded-md"
//                           >
//                             Remove
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;

'use client';

import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedBook, setEditedBook] = useState({ title: '', author: '', year: '' });
  const [userRole, setUserRole] = useState('');

  // Fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetBooks {
                books {
                  id
                  title
                  author
                  year
                  createdOn
                }
              }
            `
          }),
        });

        const data = await response.json();
        if (data.errors) {
          console.error("GraphQL Error:", data.errors[0].message);
          alert("Error fetching books: " + data.errors[0].message);
        } else {
          setBooks(data.data.books || []); // Update the state with fetched books
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("An error occurred while fetching books.");
      }
    };

    const role = sessionStorage.getItem('role'); 
    setUserRole(role);
    fetchBooks(); 
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedBook(books[index]);
  };

  const handleSave = async () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = editedBook;
    setBooks(updatedBooks);
    setEditIndex(-1);
    setEditedBook({ title: '', author: '', year: '' });

    // You can add your API call here to save the updated book data
  };

  const handleRemove = async (index) => {
    const bookToRemove = books[index];
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);

    // You can add your API call here to remove the book
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Books List</h2>
      {books.length === 0 ? (
        <div className="text-center text-lg font-semibold">No books available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-black table-auto md:table-fixed">
            <thead>
              <tr className="bg-orange-100">
                <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Title</th>
                <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Author</th>
                <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Year</th>
                <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Created On</th>
                {userRole !== 'user' && (
                  <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id} className="border border-black">
                  <td className="border border-black p-2 text-center text-lg md:text-xl">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="title"
                        value={editedBook.title}
                        onChange={handleChange}
                        className="border border-black rounded-md p-1 w-full text-center"
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td className="border border-black p-2 text-center text-lg md:text-xl">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="author"
                        value={editedBook.author}
                        onChange={handleChange}
                        className="border border-black rounded-md p-1 w-full text-center"
                      />
                    ) : (
                      book.author
                    )}
                  </td>
                  <td className="border border-black p-2 text-center text-lg md:text-xl">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="year"
                        value={editedBook.year}
                        onChange={handleChange}
                        className="border border-black rounded-md p-1 w-full text-center"
                      />
                    ) : (
                      book.year
                    )}
                  </td>
                  <td className="border border-black p-2 text-center text-lg md:text-xl">
                    {new Date(book.createdOn).toLocaleDateString()}
                  </td>
                  {userRole !== 'user' && (
                    <td className="border border-black p-2 text-center text-sm">
                      {editIndex === index ? (
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white py-1 w-20 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-blue-500 text-white py-1 w-20 rounded-md mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(index)}
                            className="bg-red-500 text-white py-1 w-20 rounded-md"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;