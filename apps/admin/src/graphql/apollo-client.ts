import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    (import.meta.env.VITE_API_URL as string) || "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
