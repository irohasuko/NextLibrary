"use client";

import { useState, useEffect } from "react";
import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";
import Button from "@/app/components/Button";

export default function ExecLend() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book/readLendable`,
        {
          cache: "no-store",
        }
      );
      const jsonData = await response.json();
      const books = jsonData.books;
      setBooks(books);
      setBook(books[0]._id);
    };

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
    };

    getBooks();
    getAllUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lending/lend`,
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
      alert("貸し出し処理失敗");
    }
  };

  return (
    <Main>
      <PageTitle title="貸し出し処理" />
      <div class="border border-gray-200 p-6 rounded-lg w-2/3 bg-white">
        <form onSubmit={handleSubmit}>
          <select
            class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={(e) => setUser(e.target.value)}
          >
            {users.map((user) => (
              <option value={user._id}>{user.name}</option>
            ))}
          </select>
          <select
            class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={(e) => setBook(e.target.value)}
          >
            {books.map((book) => (
              <option value={book._id}>{book.title}</option>
            ))}
          </select>
          <Button>貸し出し</Button>
        </form>
      </div>
    </Main>
  );
}
