import * as React from "react";
import {RaisedButton, Paper, Divider, Badge} from "material-ui";
import {ActionThumbUp} from "material-ui/lib/svg-icons";

interface SuggestionCardProps {
    title : string,
    imageURL : string
}

interface SuggestionCardState {
    numEndorsements : string;
}

export default class SuggestionCard extends React.Component<SuggestionCardProps, SuggestionCardState> {
    style : React.CSSProperties = {
        width: 200,
        display: 'inline-block'
    }

    render() : JSX.Element {
        return (
            <div>
                <Paper style={this.style} zDepth={2}>
                    <img width="200px" src={this.props.imageURL} />
                    <div className="title">{this.props.title}</div>
                    <Divider />

                    <div className="endorsements">
                        <Badge
                            badgeContent={this.state.numEndorsements}
                            primary={true} >

                            <ActionThumbUp />
                        </Badge>
                    </div>
                    <Divider />

                    <RaisedButton
                        className="btnEndorse"
                        label="Endorse"
                        secondary={true} />
                </Paper>
            </div>
        );
    }
}
