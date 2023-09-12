import Link from "next/link";
import { FC } from "react";
import { getIssues } from "./api";

const IssuesPage: FC = async () => {
  const issues = await getIssues();
  issues.reverse();

  return (
    <main>
      <h1>fe-news Issues</h1>
      <p>
        data from <a href="https://github.com/naver/fe-news">naver/fe-news</a>
      </p>
      <ul>
        {issues.map((issue) => (
          <li key={issue}>
            <Link href={`/issues/${issue}`}>{issue}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default IssuesPage;
