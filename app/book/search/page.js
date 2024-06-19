"use client";

import { useState } from "react";
import Link from "next/link";
import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";

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
    <Main>
      <PageTitle title="蔵書検索" />
      <input
        class="block w-2/3 flex-1 py-1.5 pl-1 mb-10 border rounded text-gray-900 placeholder:text-gray-400 focus:ring-0"
        value={word}
        onChange={handleChange}
        type="text"
        name="isbn"
        placeholder="タイトル、著者名、説明で検索"
      />
      {searchedBooks.map((book) => (
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/book/detail/${book._id}`}
          key={book._id}
          class="flex items-center mb-4 w-2/3 border border-gray-200 bg-white p-6 rounded-lg "
        >
          <img class="mr-5" src={book.img_path} width={100} height={200} />
          <div class="text-left">
            <h3 class="font-bold">{book.title}</h3>
            <p>著者：{book.authors.join("/")}</p>
            <p>{book.is_lend ? "貸し出し中" : "貸し出し可"}</p>
          </div>
        </Link>
      ))}
    </Main>
  );
};

export default SearchBooks;
