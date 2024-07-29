export const PGVECTOR_COLLECTION = "data";
export const PGVECTOR_SCHEMA = "public";
export const PGVECTOR_TABLE = "llamaindex_embedding";

const REQUIRED_ENV_VARS = [
  "ASTRA_DB_APPLICATION_TOKEN",
  "ASTRA_DB_API_ENDPOINT",
  "ASTRA_DB_COLLECTION",
];

export function checkRequiredEnvVars() {
  const missingEnvVars = REQUIRED_ENV_VARS.filter((envVar) => {
    return !process.env[envVar];
  });

  if (missingEnvVars.length > 0) {
    console.log(
      `The following environment variables are required but missing: ${missingEnvVars.join(
        ", ",
      )}`,
    );
    throw new Error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
}
