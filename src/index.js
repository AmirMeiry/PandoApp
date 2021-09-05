import * as React from "react";
import reactDom, { render } from "react-dom";
import App from "./App";

reactDom.render(<App/>, document.getElementById('root'));

export * from './redux/job/jobActions'
