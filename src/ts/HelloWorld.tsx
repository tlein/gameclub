import * as React from "react";

interface HelloWorldState {
    username
}

export default class HelloWorldView extends React.Component<any, HelloWorldState> {
    state : HelloWorldState = {
        username: "tlein"
    }

    handleChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    render() {
        return (
            <div>
                Hello {this.state.username} <br />
                Change Name:
                <input
                    type="text"
                    value={this.state.username}
                    onChange={(e) => { this.handleChange(e); }} />
            </div>
        )
    }
}
