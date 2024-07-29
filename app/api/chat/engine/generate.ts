/* eslint-disable turbo/no-undeclared-env-vars */
import * as dotenv from "dotenv";
import { storageContextFromDefaults, VectorStoreIndex } from "llamaindex";
import { AstraDBVectorStore } from "llamaindex/storage/vectorStore/AstraDBVectorStore";
import { getDocuments } from "./loader";
import { initSettings } from "./settings";
import { checkRequiredEnvVars } from "./shared";

dotenv.config();

async function loadAndIndex() {
  // load objects from storage and convert them into LlamaIndex Document objects
  const documents = await getDocuments();

  // // create postgres vector store
  const vectorStore = new AstraDBVectorStore();

  await vectorStore.createAndConnect(
    process.env.ASTRA_DB_COLLECTION as string,
    {
      vector: {
        dimension: parseInt(process.env.EMBEDDING_DIM!),
        metric: "cosine",
      },
    },
  );

  // create index from all the Documents
  console.log("Start creating embeddings...");
  const storageContext = await storageContextFromDefaults({ vectorStore });
  await VectorStoreIndex.fromDocuments(documents, { storageContext });
  console.log(`Successfully created embeddings.`);
}

(async () => {
  checkRequiredEnvVars();
  initSettings();
  await loadAndIndex();
  console.log("Finished generating storage.");
  process.exit(0);
})();
