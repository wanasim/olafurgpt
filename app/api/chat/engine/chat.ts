import {
  BaseToolWithCall,
  ContextChatEngine,
  OpenAIAgent,
  Settings,
} from "llamaindex";
import { getDataSource } from "./index";

export async function createChatEngine(documentIds?: string[]) {
  const tools: BaseToolWithCall[] = [];

  // Add a query engine tool if we have a data source
  // Delete this code if you don't have a data source
  const index = await getDataSource();
  console.log("INDEX", index);
  const retriever = index.asRetriever({ similarityTopK: 20 });
  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
    systemPrompt: process.env.SYSTEM_PROMPT,
    // disable as a custom system prompt disables the generated context
  });

  // if (index) {
  //   tools.push(
  //     new QueryEngineTool({
  //       queryEngine: index.asQueryEngine({
  //         retriever,
  //         // preFilters: undefined, // TODO: Add filters once LITS supports it (getQueryFilters)
  //       }),
  //       metadata: {
  //         name: "data_query_engine",
  //         description: `A query engine for documents from your data source.`,
  //       },
  //     }),
  //   );
  // }

  // const configFile = path.join("config", "tools.json");
  // let toolConfig: any;
  // try {
  //   // add tools from config file if it exists
  //   toolConfig = JSON.parse(await fs.readFile(configFile, "utf8"));
  // } catch (e) {
  //   console.info(`Could not read ${configFile} file. Using no tools.`);
  // }
  // console.log("BEFORE TOOOLS@#$@#$", tools);
  // if (toolConfig) {
  //   tools.push(...(await createTools(toolConfig)));
  // }
  console.log("TOOOLS@#$@#$", tools);
  return new OpenAIAgent({
    tools,
    systemPrompt: process.env.SYSTEM_PROMPT,
    verbose: true,
  });
}
