import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import Main from "@/app/components/Main";
import Card from "@/app/components/Card";

export default function Book() {
  return (
    <Main>
      <PageTitle title="蔵書管理" />
      <div class="w-2/3 p-4">
        <Link href="/book/create">
          <Card>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              蔵書の追加
            </h2>
            <p class="leading-relaxed text-base">
              ISBN番号や書籍のバーコードから蔵書を追加します
            </p>
          </Card>
        </Link>
        <Link href="/book/list">
          <Card>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              蔵書の一覧
            </h2>
            <p class="leading-relaxed text-base">
              現在存在する蔵書の一覧が確認できます
            </p>
          </Card>
        </Link>
        <Link href="/book/search">
          <Card>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              蔵書の検索
            </h2>
            <p class="leading-relaxed text-base">
              現在存在する蔵書を検索できます
            </p>
          </Card>
        </Link>
      </div>
    </Main>
  );
}
