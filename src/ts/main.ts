/// <reference path="../../typings/typings.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";

import HomeView from "./HomeView";

export function main(htmlRoot : HTMLElement) {
    ReactDOM.render(React.createElement(HomeView), htmlRoot);
}

main(document.getElementById("container"));
