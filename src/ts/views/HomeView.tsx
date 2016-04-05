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
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open, reason) => this.navRequestClose(open, reason)}>

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

    private navRequestClose(openState : boolean, reason) {
        this.setState({
            open: openState
        });
    }
}
