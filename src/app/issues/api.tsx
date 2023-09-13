import fs from "fs/promises";
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

  const processedContent = await remark()
    .use(html, {
      allowDangerousHtml: true,
      closeSelfClosing: true,
      allowDangerousCharacters: true,
      sanitize: false
    })
    .process(fileContents);

  const contentHtml = processedContent.toString();

  return contentHtml
    .replaceAll(/&#x3C;img/g, "<img")
    .replaceAll("<a href=", '<a target="_blank" href=');
}

export async function getIssues(): Promise<string[]> {
  const issuesDirectory = path.join(process.cwd(), "src/fe-news/issues");
  const fileNames = await fs.readdir(issuesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getH2ContentByIssueName(issueName: string) {
  const fullPath = path.join(
    process.cwd(),
    "src/fe-news/issues",
    `${issueName}.md`
  );

  const fileContents = await fs.readFile(fullPath, "utf8");

  const processedContent = remark().parse(fileContents);

  const h2s = (
    processedContent.children.filter(
      (child) =>
        child.type == "heading" && child.depth == 2 && child.children.length > 0
    ) ?? []
  )
    .map((child) => {
      return (
        (child as any)?.children?.[0]?.children?.[0]?.value ??
        (child as any)?.children?.[0].value ??
        ""
      );
    })
    .filter((h2) => h2 != "");

  return h2s;
}
