"use client";

import { useState } from "react";

const CreateBook = () => {
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
    <div>
      <h1>本情報の登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={isbn}
          onChange={handleChange}
          type="text"
          name="isbn"
          placeholder="本のISBN番号"
          required
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default CreateBook;
