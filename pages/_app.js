import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { IntlProvider } from "react-intl";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <IntlProvider locale="en">
            <Component {...pageProps} />
          </IntlProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
