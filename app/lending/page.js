import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import Main from "@/app/components/Main";
import Card from "@/app/components/Card";

export default function Book() {
  return (
    <>
      <PageTitle title="貸出管理" />
      <Main>
        <div class="w-2/3 p-4">
          <Link href="/lending/lend">
            <Card>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                蔵書の貸し出し
              </h2>
              <p class="leading-relaxed text-base">
                蔵書の貸し出し処理を行います
              </p>
            </Card>
          </Link>
          <Link href="/lending/return">
            <Card>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                蔵書の返却
              </h2>
              <p class="leading-relaxed text-base">蔵書の返却処理を行います</p>
            </Card>
          </Link>
        </div>
      </Main>
    </>
  );
}
