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
        &copy; data from{" "}
        <a href="https://github.com/naver/fe-news">naver/fe-news</a>
        <br />
        read original:{" "}
        <a
          href={`https://github.com/naver/fe-news/blob/master/issues/${issueName}.md`}
        >
          github.com/naver/issues/fe-news/{issueName}.md
        </a>
      </p>
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white"
        }}
      >
        <Link href="/issues">← Back to issues</Link>
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
