import React from 'react';
import Piechart from "./Piechart";
import PPMLineGraph from "./PPMLineGraph";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AllGraphs() {
    return(
        <div>
            <Row className="m-3 justify-content-center">
                <Col md="6" className="text-center">                 
                    <Piechart/>
                </Col>
                <Col md="6" className="text-center">
                    <PPMLineGraph/>
                </Col>
            </Row>
            
            
        </div>
    );
}

export default AllGraphs;