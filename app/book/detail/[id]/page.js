import Link from "next/link";
import Button from "@/app/components/Button";

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
    <div class="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
      <img
        class="mb-10 object-cover object-center rounded"
        src={book.img_path}
      />
      <div class="text-center lg:w-2/3 w-full">
        <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          {book.title}
        </h2>
        <p class="mb-8 leading-relaxed">著者：{book.authors.join("/")}</p>
        <p class="mb-2 leading-relaxed">ISBN：{book.isbn}</p>
        <p class="mb-8 leading-relaxed">{book.description}</p>
        <p class="mb-4 font-xl text-red-600 font-bold">
          {book.is_lend ? "貸し出し中" : "貸し出し可"}
        </p>
        <Button>
          <Link href={`/book/delete/${book._id}`}>削除</Link>
        </Button>
      </div>
    </div>
  );
}
