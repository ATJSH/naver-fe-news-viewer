import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unofficial fe-news viewer",
  description: "data from github.com/naver/fe-news",
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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <hr />
        <footer>
          Naver Corp.와는 어떠한 관련이 없는 비공식 뷰어입니다.
          <br />
          &copy;<a href="https://github.com/naver/fe-news">Naver Corp.</a>, 모든
          저작권 보유
          <br />
          <br />
          뷰어 소스코드:{" "}
          <a href="https://github.com/ATJSH/naver-fe-news-viewer">
            ATJSH/naver-fe-news-viewer
          </a>
        </footer>
      </body>
    </html>
  );
}
