import * as React from "react";

import AddFriendView from "./AddFriendView";
import FriendsListView from "./FriendsListView";

interface FriendsContainerState {
    name : string,
    friends  : string[]
}

export default class FriendsContainerView extends React.Component<any, FriendsContainerState> {
    state : FriendsContainerState = {
        name: "Tucker Lein",
        friends: [ "Jeff Swenson", "Justin Price", "Pierce McKean"]
    }

    render() : JSX.Element {
        return (
            <div>
                <h3> Name: {this.state.name} </h3>
                <AddFriendView addNewFriend={(friend) => this.addNewFriend(friend)} />
                <FriendsListView friends={this.state.friends} />
            </div>
        );
    }

    private addNewFriend(newFriend : string) {
        if (!newFriend) {
            return;
        }

        this.setState({
            name: this.state.name,
            friends: this.state.friends.concat([newFriend])
        });
    }
}
