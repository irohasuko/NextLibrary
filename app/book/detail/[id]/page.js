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

  return (
    <div>
      <img src={book.img_path} />
      <h2>{book.title}</h2>
      <h3>{book.authors}</h3>
      <h3>{book.isbn}</h3>
      <p>{book.description}</p>
    </div>
  );
}
