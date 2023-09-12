import Link from "next/link";
import { FC } from "react";
import { getIssueByIssueName, getIssues } from "../api";

const IssuePage: FC<{
  params: {
    issueName: string;
  };
}> = async ({ params: { issueName } }) => {
  return (
    <div>
      <p>
        data from <a href="https://github.com/naver/fe-news">naver/fe-news</a>
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
      <div
        dangerouslySetInnerHTML={{
          __html: await getIssueByIssueName(issueName)
        }}
      />
    </div>
  );
};

export default IssuePage;

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({
    issueName: issue
  }));
}
