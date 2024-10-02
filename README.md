# Ólafur GPT

Ólafur GPT is a generative AI-powered chatbot that provides insights and content related to the music and works of Ólafur Arnalds. This app leverages LlamaIndex, AstraDB as a vector database, GPT-turbo as the language model, and Next.js for the user interface.

## Technologies Used

- **LlamaIndex**: A flexible framework for building generative AI applications. LlamaIndex facilitates data management and interaction with the GPT model.
- **AstraDB**: Used as a vector database to store embeddings and provide efficient retrieval of information.
- **GPT-turbo**: A variant of GPT-3.5, providing quick, powerful natural language processing capabilities.
- **OpenAI**: Model provider offering powerful models for NLP tasks.
- **Next.js**: A React-based web framework used for building the UI of the application.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js version 16.x or later
- An OpenAI API key
- Access to an AstraDB instance
- AstraDB Token for authentication

## Getting Started

First, install the dependencies:

```
npm install
```

Second, generate the embeddings of the documents in the `./data` directory (if this folder exists - otherwise, skip this step):

```
npm run generate
```

Third, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Docker

1. Build an image for the Next.js app:

```
docker build -t <your_app_image_name> .
```

2. Generate embeddings:

Parse the data and generate the vector embeddings if the `./data` folder exists - otherwise, skip this step:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store the vector database
  <your_app_image_name> \
  npm run generate
```

3. Start the app:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store gea vector database
  -p 3000:3000 \
  <your_app_image_name>
```

## Using PLSQL

docker exec -it olafur-gpt-db-1 psql -U olafur olafur

\l - shows list of dbs

## Learn More

To learn more about LlamaIndex, take a look at the following resources:

- [LlamaIndex Documentation](https://docs.llamaindex.ai) - learn about LlamaIndex (Python features).
- [LlamaIndexTS Documentation](https://ts.llamaindex.ai) - learn about LlamaIndex (Typescript features).

You can check out [the LlamaIndexTS GitHub repository](https://github.com/run-llama/LlamaIndexTS) - your feedback and contributions are welcome! I even helped [patch an update](https://github.com/run-llama/create-llama/issues/164#issuecomment-2262313425) to the `create-llama` package to resolve Vercel/NextJS deployments :)
