import Link from "next/link";

const getBook = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/book/read/${id}`
  );
  const jsonData = await response.json();
  const book = jsonData.book;
  return book;
};

export default async function ShowBookDetails(context) {
  const book = await getBook(context.params.id);

  const clickHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book/delete/${context.params.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      Router.push();
    } catch (e) {
      alert("本情報の削除に失敗しました");
    }
  };

  return (
    <div>
      <img src={book.img_path} />
      <h2>{book.title}</h2>
      <h3>{book.authors}</h3>
      <h3>{book.isbn}</h3>
      <p>{book.description}</p>
      <p>{book.is_lend ? "貸し出し中" : "貸し出し可"}</p>
      <Link href={`/book/delete/${book._id}`}>削除</Link>
    </div>
  );
}
