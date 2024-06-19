"use client";

import { useState, useEffect } from "react";

export default function ExecReturn() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/readAll`,
        {
          cache: "no-store",
        }
      );
      const jsonData = await response.json();
      const allUsers = jsonData.allUsers;
      setUsers(allUsers);
      setUser(allUsers[0]._id);
      await getBooks(allUsers[0]._id);
    };
    getAllUsers();
  }, []);

  const getBooks = async (userId) => {
    setUser(userId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book/searchLendingByUser`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    const jsonData = await response.json();
    const books = jsonData.books;
    setBooks(books);
    if (books.length != 0) {
      setBook(books[0]._id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lending/return`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user,
            bookId: book,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      console.log(e);
      alert("返却処理失敗");
    }
  };

  return (
    <div>
      <h1>返却処理</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => getBooks(e.target.value)}>
          {users.map((user) => (
            <option value={user._id}>{user.name}</option>
          ))}
        </select>
        {books.length != 0 ? (
          <>
            <select onChange={(e) => setBook(e.target.value)}>
              {books.map((book) => (
                <option value={book._id}>{book.title}</option>
              ))}
            </select>
            <button>返却</button>
          </>
        ) : (
          <p>現在本を借りていません</p>
        )}
      </form>
    </div>
  );
}
