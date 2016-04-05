/// <reference path="../../typings/browser.d.ts" />

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as React from "react";
import * as ReactDOM from "react-dom";

import HomeView from "./views/HomeView";

export function main(htmlRoot : HTMLElement) {
    ReactDOM.render(React.createElement(HomeView), htmlRoot);
}

injectTapEventPlugin();


main(document.getElementById("container"));
