import * as React from "react";
import {RaisedButton, TextField} from "material-ui";

import SearchResult from "./SearchResult";

export default class SearchView extends React.Component<any, any> {
    searchElementStyle : React.CSSProperties = {
        width: "100%"
    }

    render() : JSX.Element {
        return (
            <div className="divSearchContainer">
                <TextField
                    className="searchElements"
                    hintText="Game keywords"
                    style={this.searchElementStyle}
                    floatingLabelText="Game Search Terms" />
                <RaisedButton
                    className="btnSearch"
                    label="Search" />
                <div className="clearingDiv" />


                <SearchResult
                    title="Metroid Prime"
                    imageURL="http://static.giantbomb.com/uploads/screen_medium/8/82063/2550128-primeclean.jpg" />
                <SearchResult
                    title="Metroid Prime 3: Corruption"
                    imageURL="http://static.giantbomb.com/uploads/screen_medium/9/93770/2392952-metroid_prime_3_corruption_02_artwork.jpg" />
            </div>
        );
    }
}
