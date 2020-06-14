import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./graphs/Main";
import Comparison from './Comparison';

function App() {
    return (
        <div>
            <Main/>
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

