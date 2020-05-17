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

class ModalCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false
        }

    }

    modalBody() {
        var firstCountry = this.props.countries[0];

        var modalBody =
            <>
                <br></br>
                <h5>Population: {firstCountry.population}</h5>
                <h5>Electricity: {firstCountry.electricity} CO2</h5>
                <h5>Area: {firstCountry.area} km2</h5>
                <h5>PPM: {firstCountry.ppm}</h5>
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

                <Modal show={this.state.show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                            <ListGroup horizontal>
                                <ListGroup.Item action href="#link1">
                                    General Information
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    Sectors Emissions
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link3">
                                    Input
                                </ListGroup.Item>
                            </ListGroup>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    {this.modalBody()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    <div >
                                        <Piechart countries={this.props.countries} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link3">

                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
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