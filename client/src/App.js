import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import logo from "./logo.svg";
import "./App.css";

import MapContainer from "./components/MapContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MapContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
