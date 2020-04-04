import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Input() {
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="deforestationInput">Deforestation %</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                /></InputGroup>
             
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="populationInput">Population growth %</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                /></InputGroup>
                <Button variant="primary" id="buttonStartSim">Simulation</Button>
        </div>
    );
}

export default Input;