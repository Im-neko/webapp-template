import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import withMobxStore from "../lib/with-mobx-store";
import { storesType } from "../stores";


interface IProps {
  mobxStore: storesType;
}


class MyApp extends App<IProps> {

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING", error);
    super.componentDidCatch(error, errorInfo);
  }

  render () {
    const {Component, pageProps, mobxStore} = this.props;
    return (
      <Provider {...mobxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withMobxStore(MyApp);
