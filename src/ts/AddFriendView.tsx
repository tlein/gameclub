import * as React from "react";
import {RaisedButton} from "material-ui";

interface AddFriendProps {
    addNewFriend : (string) => void;
}

interface AddFriendState {
    newFriend : string;
}

export default class AddFriendView extends React.Component<AddFriendProps, AddFriendState> {
    state : AddFriendState = {
        newFriend: ""
    }

    render() : JSX.Element {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.newFriend}
                    onChange={(e) => this.updateNewFriend(e)} />
                <RaisedButton
                    label="Add Friend"
                    onMouseUp={() => this.addNewFriend()} />
            </div>
        );
    }

    private updateNewFriend(e) {
        this.setState({
            newFriend: e.target.value
        })
    }

    private addNewFriend() {
        this.props.addNewFriend(this.state.newFriend);
        this.setState({
            newFriend: ""
        });
    }
}
