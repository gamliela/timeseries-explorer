import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppModel} from "./AppModel";
import MainPage from "./pages/MainPage/index";

// create our app model
const appModel: AppModel = new AppModel();

ReactDOM.render(
  <MainPage appModel={appModel}/>,
  document.getElementById('app-root'));
