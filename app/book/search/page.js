"use client";

import { useState } from "react";
import Link from "next/link";

const SearchBooks = () => {
  const [word, setWord] = useState("");
  const [searchedBooks, setSerchedBooks] = useState([]);

  const handleChange = async (e) => {
    setWord(e.target.value);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book/search`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            target: e.target.value,
          }),
        }
      );
      const jsonData = await response.json();
      setSerchedBooks(jsonData.searchedBooks);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>本情報の検索</h1>
      <input
        value={word}
        onChange={handleChange}
        type="text"
        name="isbn"
        placeholder="タイトル、著者名、説明で検索"
        required
      />
      {searchedBooks.map((book) => (
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/book/detail/${book._id}`}
          key={book._id}
        >
          <img src={book.img_path} width={100} height={200} />
          <h2>{book.title}</h2>
          <h3>{book.authors}</h3>
          <h3>{book.isbn}</h3>
          <p>{book.description.substring(0, 80) + "........"}</p>
          <br />
        </Link>
      ))}
    </div>
  );
};

export default SearchBooks;
