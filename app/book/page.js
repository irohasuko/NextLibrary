import Link from "next/link";

export default function Book() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/book/create">本の追加</Link>
      <Link href="/book/list">本の一覧</Link>
      <Link href="/book/search">本の検索</Link>
    </main>
  );
}
