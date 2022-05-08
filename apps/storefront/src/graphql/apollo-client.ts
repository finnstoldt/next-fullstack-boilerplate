import { ApolloClient, InMemoryCache } from "@apollo/client";
import { log } from "logger";

log("api-url: " + process.env.NEXT_PUBLIC_API_URL);

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
