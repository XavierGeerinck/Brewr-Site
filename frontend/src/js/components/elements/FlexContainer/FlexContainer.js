import React from 'react';
import "./FlexContainer.css";

export default class FlexContainer  extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="FlexContainer">
                {this.props.children}
            </div>
        )
    }
}
