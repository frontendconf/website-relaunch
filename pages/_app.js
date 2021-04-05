import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { IntlProvider } from "react-intl/dist";
import * as GoogleAnalytics from "../lib/gtag";
import * as HubSpot from "../lib/hubspot";
import * as Iubenda from "../lib/iubenda";
import Router from "next/router";

Router.events.on("routeChangeComplete", url => {
  GoogleAnalytics.pageview(url);
  HubSpot.pageview(url);
});

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <GoogleAnalytics.Script />
          <HubSpot.Script />
          <Iubenda.Script />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="/static/favicon/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/static/favicon/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/static/favicon/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/static/favicon/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="/static/favicon/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/static/favicon/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="/static/favicon/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/static/favicon/apple-touch-icon-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-196x196.png"
            sizes="196x196"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-128.png"
            sizes="128x128"
          />
          <meta name="application-name" content="&nbsp;" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta
            name="msapplication-TileImage"
            content="/static/favicon/mstile-144x144.png"
          />
          <meta
            name="msapplication-square70x70logo"
            content="/static/favicon/mstile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/static/favicon/mstile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/static/favicon/mstile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/static/favicon/mstile-310x310.png"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <IntlProvider locale="en">
            <Component {...pageProps} />
          </IntlProvider>
        </ApolloProvider>
      </div>
    );
  }
}

export default withApolloClient(MyApp);
