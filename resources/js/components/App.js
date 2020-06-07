import React from 'react';
import ReactDOM from 'react-dom';
import AllGraphs from "./graphs/AllGraphs";
import Comparison from './Comparison';
import StepperTutorial from './Stepper';

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

if(document.getElementById('stepper')){
    ReactDOM.render(<StepperTutorial />, document.getElementById('stepper'));
}
