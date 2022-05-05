import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import client from "./graphql/apollo-client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
