import { log } from "logger";
import { PrismaClient, User } from "@prisma/client";
import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";

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
    res.send("Hello World!");
  })
  .get("/prisma", async function (req, res) {
    res.send(
      JSON.stringify(await prisma.user.findMany({ select: { name: true } }))
    );
  });

const httpServer = http.createServer(app);

const typeDefs = gql`
  type User {
    id: Int
    createdAt: String
    email: String
    name: String
    role: String
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
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
