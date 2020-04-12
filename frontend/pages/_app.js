import "../styles/index.css";
import App from "next/app";
import Head from "next/head";
// import { Provider } from "@shopify/app-bridge-react";
// import Cookies from "js-cookie";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

/** Create a context object 
 * https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/
 * In the context object, put the shop. That way you can reference is throughout the application. 
 * Create the shop object when initizling from the server.  
 */


/**
 * Cognito, which is AWS's JWT provider, potentially consider. 
 * Use this to bake in values into the JWT, so that when you're authenticated to the site, the token has the values.
 * e.g. store.
 * This is usefule because to access your back end the JWT has to be sent, and since that's always sent you have the
 * store always.
 */

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
