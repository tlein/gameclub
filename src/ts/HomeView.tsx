import * as React from "react";
import {RaisedButton, LeftNav} from "material-ui";

import SearchView from "./SearchView";

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
                <RaisedButton
                    label="Add New Game"
                    className="btnAddNewGame"
                    secondary={true}
                    onMouseUp={() => this.addNewGame()} />
                <LeftNav
                    width={300}
                    open={this.state.open}>
                    <SearchView />
                </LeftNav>
            </div>
        );
    }

    private addNewGame() {
        this.setState({
            open: !this.state.open
        });
    }
}
