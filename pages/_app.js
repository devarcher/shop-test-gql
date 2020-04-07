import "../styles/index.css";
import App from "next/app";
import Head from "next/head";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Shopify Tailwind Test</title>
          <meta charSet="utf-8" />
        </Head>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
