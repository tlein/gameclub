import * as React from "react";

interface FriendsListProps {
    friends : string[];
}

export default class FriendsListView extends React.Component<FriendsListProps, any> {
    render() : JSX.Element {
        var listFriends : JSX.Element[] = this.listFriends();
        return (
            <div>
                <h3> Friends </h3>
                <ul>
                    {listFriends}
                </ul>
            </div>
        );
    }

    private listFriends() : JSX.Element[] {
        return this.props.friends.map((friend) => {
            return <li> {friend} </li>;
        });
    }
}
