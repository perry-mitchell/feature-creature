import { unified } from "unified";
import remarkParse from "remark-parse";

export async function extractFeatures(markdown: string): Promise<any> {
    const data = await unified().use(remarkParse).process(markdown);
    console.log("FILE", data);
}
