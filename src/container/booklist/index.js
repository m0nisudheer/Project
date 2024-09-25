'use client';

import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedBook, setEditedBook] = useState({ title: '', author: '', year: '' });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(storedBooks);
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedBook(books[index]);
  };

  const handleSave = () => {
    const updatedBooks = books.map((book, index) => (index === editIndex ? editedBook : book));
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setEditIndex(-1);
    setEditedBook({ title: '', author: '', year: '' });
  };

  const handleRemove = (index) => {
    const updatedBooks = books.reduce((acc, book, i) => {
      if (i !== index) {
        acc.push(book);
      }
      return acc;
    }, []);

    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
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
                {userRole !== 'user' && (
                  <th className="border border-black p-2 w-1/4 text-center text-lg md:text-xl font-bold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className="border border-black">
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
