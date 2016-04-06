import * as React from "react";
import {RaisedButton, TextField, CircularProgress} from "material-ui";
import * as jQuery from "jquery";

import SearchResult from "./SearchResult";

interface SearchViewState {
    searchTerms : string,
    results : Array<any>
}

export default class SearchView extends React.Component<any, SearchViewState> {
    state : SearchViewState = {
        searchTerms: "",
        results: []
    }

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
                    value={this.state.searchTerms}
                    onChange={(event) => this.searchTermChange(event)}
                    floatingLabelText="Game Search Terms" />
                <RaisedButton
                    className="btnSearch"
                    onTouchTap={() => this.search()}
                    label="Search" />
                <div className="clearingDiv" />

                <div id="loadingBar" className="noDisplay">
                    <div className="loadingIndicator">
                        <CircularProgress />
                    </div>
                </div>

                {this.state.results}
            </div>
        );
    }

    private searchTermChange(event) {
        this.setState({
            searchTerms: event.target.value,
            results: this.state.results
        });
    }

    private search() {
        this.setState({
            searchTerms: this.state.searchTerms,
            results: []
        });
        jQuery("#loadingBar").removeClass("noDisplay");
        jQuery.ajax({
            url: "/search",
            data: {"searchTerms": this.state.searchTerms}
        }).done((response) => {
            jQuery("#loadingBar").addClass("noDisplay");
            var searchElements = [];
            console.log(response.results);
            response.results.map((element) => {
                if (element['name'] && element['image'] && element['image']['screen_url']) {
                    searchElements.push(<SearchResult key={element['id']} title={element['name']} imageURL={element['image']['screen_url']} />);
                }
            });
            this.setState({
                searchTerms: this.state.searchTerms,
                results: searchElements
            });
        });
    }
}
