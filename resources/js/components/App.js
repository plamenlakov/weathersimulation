import React from 'react';
import ReactDOM from 'react-dom';
import AllGraphs from "./graphs/AllGraphs";
import Comparison from './Comparison';

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

if(document.getElementById('compare')){
    ReactDOM.render(<Comparison />, document.getElementById('compare'));
}

