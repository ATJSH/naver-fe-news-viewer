import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "naver/fe-news 뉴스레터 뷰어 (비공식)",
  icons: [
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📰</text></svg>"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className=" dark:bg-black dark:text-white">
        <main className=" max-w-xl p-2 m-auto mt-20 mb-4">
          {children}
          <hr className=" my-4" />
        </main>
        <footer className=" text-center text-zinc-500 mb-7">
          <p>
            Naver Corp.와는 어떠한 관련이 없는 비공식 뷰어입니다. &copy;
            <a href="https://github.com/naver/fe-news" className=" underline">
              Naver Corp.
            </a>
            , 모든 저작권 보유
          </p>
          <p>
            뷰어 소스코드:{" "}
            <a
              href="https://github.com/ATJSH/naver-fe-news-viewer"
              className="underline"
            >
              ATJSH/naver-fe-news-viewer
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
