import React from 'react';
import ReactDOM from 'react-dom';
import Map from "./Map";
import AllGraphs from "./graphs/AllGraphs";
import Input from "./Input";
import Presets from "./Presets";

function App() {
    return (
        <div className="">
            Bruh
            <Input/>
            <Map/>
            <AllGraphs/>
        </div>
    );
}


export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

