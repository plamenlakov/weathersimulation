import React from 'react';
import Piechart from "./Piechart";
import PPMLineGraph from "./PPMLineGraph";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function AllGraphs() {
    return (
        <div>
            <Alert variant='secondary' className='m-3'>
                <Alert.Heading className='m-2'>Charts</Alert.Heading>
                <Row className="m-1 justify-content-center">
                    <Col md="6" className="text-center mt-3">
                        <Piechart />
                    </Col>
                    <Col md="6" className="text-center mt-3">
                        <PPMLineGraph />
                    </Col>
                </Row>
            </Alert>



        </div>
    );
}

export default AllGraphs;