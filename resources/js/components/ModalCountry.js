import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Piechart from './graphs/Piechart';

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
                <h5>Population: {firstCountry.population}</h5>
                <h5>Electricity: {firstCountry.electricity} CO2</h5>
                <h5>Area: {firstCountry.area} km2</h5>
                <h5>PPM: {firstCountry.ppm}</h5>
                <Piechart countries={this.props.countries} />
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
                    <Modal.Body>{this.modalBody()}</Modal.Body>
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