import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Piechart from './graphs/Piechart';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from "react-bootstrap/Tab";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from "react-bootstrap/Container";


class ModalCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false
        }

    }

    modalBody() {
        //var firstCountry = this.props.countries[0];

        var modalBody =
            <>
                <Tab.Container id="list-group-tabs" defaultActiveKey="#info">
                    <ListGroup horizontal>
                        <ListGroup.Item action href="#info">
                            General information
                                </ListGroup.Item>
                        <ListGroup.Item action href="#piechart">
                            Sectors piechart
                                </ListGroup.Item>
                        <ListGroup.Item action href="#inputs">
                            Change country values
                        </ListGroup.Item>
                    </ListGroup>
                    <Tab.Content className="m-3">
                        <Tab.Pane eventKey="#info">
                            <br></br>
                            <h5>Population: {this.props.country.population}</h5>
                            <h5>Electricity: {this.props.country.electricity} CO2</h5>
                            <h5>Area: {this.props.country.area} km2</h5>
                            <h5>PPM: {this.props.country.ppm}</h5>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#piechart">
                            <Piechart className="m-1" country={this.props.country} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#inputs">

                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

            </>

       
        return modalBody;
    }


    render() {

        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
 
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal size="lg" show={this.state.show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.country.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {this.modalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default ModalCountry;