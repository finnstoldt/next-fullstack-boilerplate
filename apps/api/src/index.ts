import { log } from "logger";
import { PrismaClient, User } from "@prisma/client";
import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import path from "path";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { Resolvers } from "graphql-codegen";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

const app = express();

app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())
  .get("/", function (req, res) {
    res.send("Hello Worldd!");
  })
  .get("/prisma", async function (req, res) {
    res.send(
      JSON.stringify(await prisma.user.findMany({ select: { name: true } }))
    );
  });

const httpServer = http.createServer(app);

const typeDefs = loadSchemaSync(
  path.resolve(__dirname, "../graphql/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const resolvers: Resolvers = {
  Query: {
    users: async () =>
      (await prisma.user.findMany()).map((user: User) => ({
        id: user.id,
        createdAt: user.createdAt.toISOString(),
        email: user.email,
        name: user.name,
        role: user.role.toString(),
      })),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startServer();
