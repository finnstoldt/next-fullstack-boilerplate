import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_STOREFRONT_API_URL ||
    "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
