import * as React from "react";
import {Card, CardMedia, CardHeader} from "material-ui";

interface SearchResultProps {
    title : string,
    imageURL : string
}

export default class SearchResult extends React.Component<SearchResultProps, any> {
    render() : JSX.Element {
        return (
            <Card style={ { marginTop: "20px" } }>
                <CardHeader
                    title={this.props.title}
                    textStyle={ {paddingRight: "0"} } />
                <CardMedia>
                    <img src={this.props.imageURL} />
                </CardMedia>
            </Card>
        );
    }
}
