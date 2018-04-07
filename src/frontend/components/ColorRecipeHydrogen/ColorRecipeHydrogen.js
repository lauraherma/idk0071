import React from 'react';

export class ColorRecipeHydrogen extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const { id, amount, name } = this.props.hydrogen;

        return <div className="ColorRecipeHydrogen">
            id: {id},
            amount: {amount},
            name: {name}
        </div>;
    }
}
