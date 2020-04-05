import React from 'react';
import ReactDOM from 'react-dom';
import AllGraphs from "./graphs/AllGraphs";

function App() {
    return (
        <div>
            <AllGraphs/>
        </div>
    );
}


export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

