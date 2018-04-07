import React from 'react';

export class ColorRecipeColor extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const { id, amount, code } = this.props.color;
        
        return <div className="ColorRecipeColor">
            id: {id},
            amount: {amount},
            code: {code}
        </div>;
    }
}
