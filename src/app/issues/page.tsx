import Link from "next/link";
import { FC } from "react";
import { getIssues } from "./api";

const IssuesPage: FC = async () => {
  const issues = await getIssues();
  issues.reverse();

  return (
    <main>
      <h1>📰 naver/fe-news 뉴스레터 뷰어</h1>
      <p>
        &apos;네이버의 프론트엔드 기술 소식 큐레이션 뉴스레터&apos;의 비공식
        뷰어
        <br />
        &copy;<a href="https://github.com/naver/fe-news">Naver Corp.</a>, 모든
        저작권 보유
      </p>
      <h2>뉴스레터 목록</h2>
      <hr />
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
