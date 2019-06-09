import Document, { Html, Head, Main, NextScript } from "next/document";

// Properly handle noscript case on client via custom CSS class on <html>
class MyDocument extends Document {
  render() {
    return (
      <Html className="no-js">
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.remove("no-js");`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
