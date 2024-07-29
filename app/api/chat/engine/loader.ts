import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
  Document,
  FILE_EXT_TO_READER,
  LlamaParseReader,
  Metadata,
  SimpleDirectoryReader,
} from "llamaindex";
export const DATA_DIR = "./data";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

export async function getDocuments(): Promise<Document<Metadata>[]> {
  const docs: Document[] = [];

  const reader = new SimpleDirectoryReader();
  const dataText = await reader.loadData({
    directoryPath: DATA_DIR,
    fileExtToReader: {
      ...FILE_EXT_TO_READER,
      text: new LlamaParseReader({
        resultType: "text",
        apiKey: "llx-0c1LUE2v6HePJRHWtnTlMhj4SJsyFcbyuKYp5yLUzAeViOo1",
      }),
    },
  });

  docs.push(...dataText);

  const websites = [
    "https://olafurarnalds.com/",
    "https://en.wikipedia.org/wiki/%C3%93lafur_Arnalds",
    "https://www.allmusic.com/artist/%C3lafur-arnalds-mn0000335052",
    "https://www.allmusic.com/artist/%C3lafur-arnalds-mn0000335052#songs",
  ];
  for (const website of websites) {
    /** scrape website to get a single Document */
    const content = await scrapePage(website);
    /** split Document into reasonably sized chunks */
    const chunks = await splitter.splitText(JSON.stringify(content));
    /** pass each chunk as a LlamaIndex-compatible Document */
    for (const chunk of chunks) {
      docs.push(new Document({ text: chunk }));
    }
  }
  return docs;
}

const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: true },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });
  // return loader.load();
  return (await loader.scrape())?.replace(/<[^>]*>?|\n/gm, "");
};

(async () => {
  const data = await getDocuments();
  console.log("DATA", JSON.stringify(data));
})();
