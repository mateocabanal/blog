import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";

import Navbar from "../components/Navbar";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Akshar:wght@300;400;600;700;800&family=Open+Sans:wght@400;600;700&family=Inconsolata:wght@400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#1C1C1C" />
        </Head>
        <body>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-131686490-4"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-131686490-4');
        `}
          </Script>

          <Navbar />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
