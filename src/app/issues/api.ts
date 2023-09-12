import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export async function getIssueByIssueName(issueName: string) {
  const fullPath = path.join(
    process.cwd(),
    "src/fe-news/issues",
    `${issueName}.md`
  );

  const fileContents = await fs.readFile(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, {
      allowDangerousHtml: true,
      closeSelfClosing: true,
      allowDangerousCharacters: true,
      sanitize: false
    })
    .process(matterResult.content);

  const contentHtml = processedContent.toString()

  return contentHtml.replace(/&#x3C;img/g, "<img");
}

export async function getIssues(): Promise<string[]> {
  const issuesDirectory = path.join(process.cwd(), "src/fe-news/issues");
  const fileNames = await fs.readdir(issuesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}
