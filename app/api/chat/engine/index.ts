import { VectorStoreIndex } from "llamaindex";
import { AstraDBVectorStore } from "llamaindex/storage/vectorStore/AstraDBVectorStore";
import { checkRequiredEnvVars } from "./shared";

export async function getDataSource() {
  checkRequiredEnvVars();
  const astraVS = new AstraDBVectorStore();
  // await astraVS.connect(process.env.ASTRA_DB_COLLECTION as string);

  // const ctx = serviceContextFromDefaults();
  // const index = await VectorStoreIndex.fromVectorStore(astraVS, ctx);
  // return index;
  const store = new AstraDBVectorStore();
  await store.connect(process.env.ASTRA_DB_COLLECTION!);
  return await VectorStoreIndex.fromVectorStore(store);
}
