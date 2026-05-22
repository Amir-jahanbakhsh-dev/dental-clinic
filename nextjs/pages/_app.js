import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return(
    <body dir="rtl">
      <Component {...pageProps} />;
    </body>
  ) 
}
