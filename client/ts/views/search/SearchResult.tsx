import * as React from "react";
import {Card, CardMedia, CardHeader, CardTitle} from "material-ui";

interface SearchResultProps {
    title : string,
    imageURL : string
}

export default class SearchResult extends React.Component<SearchResultProps, any> {
    render() : JSX.Element {
        return (
            <Card style={ { marginTop: "20px" } }>
                <CardMedia overlay={<CardTitle title={this.props.title} />}>
                    <img width="265px" height="149px" src={this.props.imageURL} />
                </CardMedia>
            </Card>
        );
    }
}
