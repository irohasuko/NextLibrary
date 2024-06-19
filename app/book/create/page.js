"use client";

import { useState } from "react";
import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";
import Button from "@/app/components/Button";

export default function CreateBook() {
  const [isbn, setIsbn] = useState("");

  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isbn: isbn,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      alert("本情報の登録に失敗しました");
    }
  };

  return (
    <Main>
      <PageTitle title="本情報の登録" />
      <div class="border border-gray-200 p-6 rounded-lg w-2/3 bg-white">
        <form onSubmit={handleSubmit}>
          <input
            class="block w-full flex-1 py-1.5 pl-1 border rounded text-gray-900 placeholder:text-gray-400 focus:ring-0"
            value={isbn}
            onChange={handleChange}
            type="text"
            name="isbn"
            placeholder="本のISBN番号"
            required
          />
          <Button>登録</Button>
        </form>
      </div>
    </Main>
  );
}
