// your-project-folder/src/index.js

// Import React and ReactDOM
import React from 'react'
import ReactDOM from 'react-dom';
import App from './js/components/App';

// Render component into the DOM - only once per app
ReactDOM.render(
<App />,
    document.getElementById('root')
);


class HairdresserList extends React.Component {
    render() {
        return (
            <div className="hairdresser-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}
