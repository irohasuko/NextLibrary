import Link from "next/link";

const getAllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/book/readAll`,
    {
      cache: "no-store",
    }
  );
  const jsonData = await response.json();
  const allBooks = jsonData.allBooks;
  return allBooks;
};

export default async function ShowAllBooks() {
  const allBooks = await getAllBooks();

  return (
    <div>
      <h1>蔵書一覧</h1>
      {allBooks.map((book) => (
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/book/detail/${book._id}`}
          key={book._id}
        >
          <img src={book.img_path} width={100} height={200} />
          <h2>{book.title}</h2>
          <h3>{book.authors}</h3>
          <h3>{book.isbn}</h3>
          <p>{book.description.substring(0, 20)}</p>
          <p>{book.is_lend ? "貸し出し中" : "貸し出し可"}</p>
          <br />
        </Link>
      ))}
    </div>
  );
}
