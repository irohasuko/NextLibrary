import { redirect } from "next/navigation";

const deleteBook = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const jsonData = await response.json();
    return jsonData.message;
  } catch (e) {
    const message = "本情報の削除に失敗しました";
    return message;
  }
};

export default async function DeleteBook(context) {
  const message = await deleteBook(context.params.id);
  console.log(message);
  redirect("/book");
}
