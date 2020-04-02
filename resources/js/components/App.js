import React from 'react';
import ReactDOM from 'react-dom';
import Map from "./Map";
import AllGraphs from "./graphs/AllGraphs";
import Input from "./Input";
import Presets from "./Presets";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    return (
        <div>
            <Row className="m-1">
                <Col md="4" className="border border-dark">
                    <Input/>
                </Col>  
                <Col md="8" className="border border-dark">    
                    <Map/>
                </Col>
            </Row>
                     
            <AllGraphs/>
        </div>
    );
}


export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

