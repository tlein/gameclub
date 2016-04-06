import * as React from "react";
import {LeftNav} from "material-ui";

import SuggestionListView from "./SuggestionListView";
import SearchView from "../search/SearchView";

interface HomeViewState {
    open : boolean,
}

export default class HomeView extends React.Component<any, HomeViewState> {
    state : HomeViewState = {
        open: false
    }

    render() : JSX.Element {
        return (
            <div className="homeView">
                <LeftNav
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open, reason) => this.navRequestClose(open, reason)}>

                    <SearchView />
                </LeftNav>
                <SuggestionListView clickSuggestGame={() => this.openSearch()} />
            </div>
        );
    }

    private openSearch() {
        this.setState({
            open: !this.state.open
        });
    }

    private navRequestClose(openState : boolean, reason) {
        this.setState({
            open: openState
        });
    }
}
