import Link from "next/link";
import { FC } from "react";
import { getH2ContentByIssueName, getIssues } from "./api";

const IssuesPage: FC = async () => {
  const issues = await getIssues();
  issues.reverse();

  return (
    <>
      <div>
        <div className=" text-5xl mb-3">📰</div>
        <h1 className=" text-3xl font-bold">
          naver/fe-news 뉴스레터 뷰어 (비공식)
        </h1>
        <p className="my-3">
          네이버의 프론트엔드 기술 소식 큐레이션 뉴스레터를 가장 편하게 보는
          방법
        </p>
        <p className="my-3">
          뉴스레터 출처: &copy;
          <a
            href="https://github.com/naver/fe-news"
            className="underline text-blue-600 visited:text-purple-600"
            target="_black"
          >
            Naver Corp.
          </a>
          , 모든 저작권 보유
        </p>
      </div>
      <div className="mt-10">
        <h2 className=" text-2xl font-bold">뉴스레터 목록</h2>
        <hr className=" my-3" />
        <ul className=" flex gap-3 flex-col w-full">
          {issues.map(async (issue) => {
            const h2s = await getH2ContentByIssueName(issue);
            const slicedH2s = h2s.slice(0, 3);

            return (
              <Link
                href={`/issues/${issue}`}
                key={issue}
                className="text-blue-600 visited:text-purple-600 hover:underline cursor-pointer p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <li className="">
                  <div>
                    <div className=" text-xl">{issue}</div>
                    <div className=" text-zinc-400 text-sm">
                      {slicedH2s.map((h2) => (
                        <>
                          {`"${h2}"`} <br />
                        </>
                      ))}
                      ... 외 {h2s.length - slicedH2s.length}개의 주제
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default IssuesPage;
