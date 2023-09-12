import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { FC } from "react";
import { remark } from "remark";
import html from "remark-html";

async function getIssueByIssueName(issueName: string) {
  const fullPath = path.join(
    process.cwd(),
    "src/fe-news/issues",
    `${issueName}.md`
  );

  const fileContents = await fs.readFile(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

const IssuePage: FC<{
  params: {
    issueName: string;
  };
}> = async ({ params: { issueName } }) => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: await getIssueByIssueName(issueName)
        }}
      />
    </div>
  );
};

export default IssuePage;
