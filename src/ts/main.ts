/// <reference path="../../typings/typings.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";

import FriendsContainerView from "./FriendsContainerView";

export function main(htmlRoot : HTMLElement) {
    ReactDOM.render(React.createElement(FriendsContainerView), htmlRoot);
}

main(document.getElementById("container"));
