import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import { getIssueByIssueName, getIssues } from "../api";

const IssuePage: FC<{
  params: {
    issueName: string;
  };
}> = async ({ params: { issueName } }) => {
  return (
    <main>
      <p>
        <b>📰 naver/fe-news 뉴스레터 뷰어 (비공식)</b>
        <br />
        {issueName}{" "}
        <a
          href={`https://github.com/naver/fe-news/blob/master/issues/${issueName}.md`}
        >
          #
        </a>
      </p>
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white"
        }}
      >
        <Link href="/issues">← 뉴스 목록으로 돌아가기</Link>
      </header>
      <br />
      <hr />
      <div
        dangerouslySetInnerHTML={{
          __html: await getIssueByIssueName(issueName)
        }}
      />
    </main>
  );
};

export default IssuePage;

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({
    issueName: issue
  }));
}

export async function generateMetadata({
  params: { issueName }
}: {
  params: {
    issueName: string;
  };
}): Promise<Metadata> {
  return {
    title: `${issueName} | unofficial fe-news viewer`
  };
}
