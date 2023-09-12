import path from "path";
import fs from "fs/promises";
import { FC } from "react";
import Link from "next/link";

async function getIssues(): Promise<string[]> {
  const issuesDirectory = path.join(process.cwd(), "src/fe-news/issues");
  const fileNames = await fs.readdir(issuesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

const IssuesPage: FC = async () => {
  const issues = await getIssues();
  issues.reverse();

  return (
    <main>
      <h1>fs-news Issues</h1>
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
