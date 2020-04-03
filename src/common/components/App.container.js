import React, { Component } from "react";
import MainContainer from "./Main.container";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../redux";
import { forceHTTPS } from "../utils/helpers";

// const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const { store, persistor } = configureStore;

class App extends Component {
  UNSAFE_componentWillMount() {
    forceHTTPS();
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainContainer />
        </PersistGate>
      </ReduxProvider>
    );
  }
}

export default App;
