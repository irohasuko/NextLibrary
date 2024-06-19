import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";
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
    <Main>
      <PageTitle title="蔵書一覧" />
      {allBooks.map((book) => (
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
}
