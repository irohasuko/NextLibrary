"use client";

import { useState, useEffect } from "react";

import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";
import Button from "@/app/components/Button";

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
    <Main>
      <PageTitle title="返却処理" />
      <div class="border border-gray-200 p-6 rounded-lg w-2/3 bg-white">
        <form onSubmit={handleSubmit}>
          <select
            class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={(e) => getBooks(e.target.value)}
          >
            {users.map((user) => (
              <option value={user._id}>{user.name}</option>
            ))}
          </select>
          {books.length != 0 ? (
            <>
              <select
                class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={(e) => setBook(e.target.value)}
              >
                {books.map((book) => (
                  <option value={book._id}>{book.title}</option>
                ))}
              </select>
              <Button>返却</Button>
            </>
          ) : (
            <p class="text-lg text-red-600 m-5">現在本を借りていません</p>
          )}
        </form>
      </div>
    </Main>
  );
}
