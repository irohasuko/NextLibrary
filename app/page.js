import Link from "next/link";
import Main from "./components/Main";
import Card from "./components/Card";

export default function Home() {
  return (
    <Main>
      <div class="w-2/3 p-4">
        <Link href="/lending/lend">
          <Card>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              蔵書管理
            </h2>
            <p class="leading-relaxed text-base">
              蔵書の追加や一覧表示/検索が行えます
            </p>
          </Card>
        </Link>
        <Link href="/lending/return">
          <Card>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              貸出管理
            </h2>
            <p class="leading-relaxed text-base">
              蔵書の貸出/返却処理が行えます
            </p>
          </Card>
        </Link>
      </div>
    </Main>
  );
}
