import * as React from "react";
import {RaisedButton} from "material-ui";

import SuggestionCard from "./SuggestionCard";

interface SuggestionListViewProps {
    clickSuggestGame: () => void
}

export default class SuggestionListView extends React.Component<SuggestionListViewProps, any> {
    render() : JSX.Element {
        return (
            <div>
                <RaisedButton
                    label="Suggest Game"
                    className="btnAddNewGame"
                    primary={true}
                    onMouseUp={() => this.props.clickSuggestGame()} />
            </div>
        );
    }
}
