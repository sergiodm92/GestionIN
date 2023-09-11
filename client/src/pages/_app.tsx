import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { store } from "../store/store";

function MyApp(appProps: AppProps) {
  const { Component, pageProps } = appProps;

  return (
    <>
      <Head>
        <title>Instituto del Norte Gestion</title>
      </Head>
      <Provider store={store}>
        <div
          style={{
            width: "100%",
            minHeight:"100vh",
            margin:"0",
            padding:"0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </>
  );
}
export default MyApp;
