import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import fs from "fs/promises";

export async function getIssueByIssueName(issueName: string) {
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

export async function getIssues(): Promise<string[]> {
  const issuesDirectory = path.join(process.cwd(), "src/fe-news/issues");
  const fileNames = await fs.readdir(issuesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}
