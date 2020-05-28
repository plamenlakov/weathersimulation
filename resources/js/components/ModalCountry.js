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
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs'
import TextField from '@material-ui/core/TextField';
import Table from 'react-bootstrap/Table';
import Electricity from './classes/ConcreteSectors/Electricity';
import Building from './classes/ConcreteSectors/Building';
import Transportation from './classes/ConcreteSectors/Transportation';
import Agriculture from './classes/ConcreteSectors/Agriculture';
import Manufacturing from './classes/ConcreteSectors/Manufacturing';
import Industry from './classes/ConcreteSectors/Industry';

class ModalCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false,
            items: [],

            deforestationIncrease: props.country.forestsGrowth,
            electricityIncrease: props.country.sectors.find(el => el instanceof Electricity).percentage,
            transportationIncrease: props.country.sectors.find(tr => tr instanceof Transportation).percentage,
            buildingIncrease: props.country.sectors.find(bl => bl instanceof Building).percentage,
            agricultureIncrease: props.country.sectors.find(ag => ag instanceof Agriculture).percentage,
            industryIncrease: props.country.sectors.find(ind => ind instanceof Industry).percentage,
            manufacturingIncrease: props.country.sectors.find(man => man instanceof Manufacturing).percentage
        }

    }

    //Update deforestation input
    updateDeforestationInput(evt) {
        this.setState({
            deforestationIncrease: +evt.target.value
        })
    }
    updateElectricityInput(evt) {
        this.setState({
            electricityIncrease: +evt.target.value
        })
    }
    updateTransportationInput(evt) {
        this.setState({
            transportationIncrease: +evt.target.value
        })
    }
    updateBuildingInput(evt) {
        this.setState({
            buildingIncrease: +evt.target.value
        })
    }
    updateManufacturingInput(evt) {
        this.setState({
            manufacturingIncrease: +evt.target.value
        })
    }

    updateIndustryInput(evt) {
        this.setState({
            industryIncrease: +evt.target.value
        })

    }
    updateAgricultureInput(evt) {
        this.setState({
            agricultureIncrease: +evt.target.value
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.country != this.props.country) {
            this.setState({
                deforestationIncrease: this.props.country.forestsGrowth,
                electricityIncrease: this.props.country.sectors.find(el => el instanceof Electricity).percentage,
                transportationIncrease: this.props.country.sectors.find(tr => tr instanceof Transportation).percentage,
                buildingIncrease: this.props.country.sectors.find(bl => bl instanceof Building).percentage,
                agricultureIncrease: this.props.country.sectors.find(ag => ag instanceof Agriculture).percentage,
                industryIncrease: this.props.country.sectors.find(ind => ind instanceof Industry).percentage,
                manufacturingIncrease: this.props.country.sectors.find(man => man instanceof Manufacturing).percentage
            })
        }
    }

    updateChosenCountry() {
        this.props.country.deforestationGrowth = this.state.deforestationIncrease
        this.props.country.electricityGrowth = this.state.electricityIncrease
        this.props.country.transportationGrowth = this.state.transportationIncrease
        this.props.country.buildingGrowth = this.state.buildingIncrease
        this.props.country.agricultureGrowth = this.state.agricultureIncrease
        this.props.country.industryGrowth = this.state.industryIncrease
        this.props.country.manufacturingIncrease = this.state.manufacturingIncrease
        this.props.updateChosenCountry(this.props.country)
    }


    modalBody() {
        var modalBody =
            <>
                <Tab.Container id="list-group-tabs" defaultActiveKey="#info">
                    <ListGroup horizontal>
                        <ListGroup.Item action href='#info'>
                            General Information
                                </ListGroup.Item>
                        <ListGroup.Item action href='#inputs'>
                            Change country values
                        </ListGroup.Item>
                    </ListGroup>
                    <Tab.Content className="m-3">
                        <Tab.Pane eventKey="#info" >
                            <Row>
                                <Col md='12'>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Population</th>
                                                <th>Area (in km²)</th>
                                                <th>Forest area (in km²)</th>
                                                <th>Forest area (in %)</th>
                                                <th>PPM</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.props.country.population}</td>
                                                <td>{this.props.country.area}</td>
                                                <td>{Math.round(this.props.country.getForestArea() * 100) / 100}</td>
                                                <td>{this.props.country.forests}</td>
                                                <td>{Math.round(this.props.country.ppm * 100) / 100}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5" className='text-center'><img src={'images/flags/' + this.props.country.name + '.png'} style={{ width: 25 + '%' }}></img> </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                            <Piechart className="m-1" country={this.props.country} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#inputs">
                            <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.deforestationIncrease.toString()} label="Deforestation %" variant="outlined" onChange={evt =>
                                this.updateDeforestationInput(evt)} fullWidth />
                            <Row>
                                <Col md="4">
                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.electricityIncrease.toString()} label="Electricity increase %" variant="outlined" onChange={evt =>
                                        this.updateElectricityInput(evt)} fullWidth />

                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.transportationIncrease.toString()} label="Transportation increase %" variant="outlined" onChange={evt =>
                                        this.updateTransportationInput(evt)} fullWidth />
                                </Col>

                                <Col md="4">
                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.buildingIncrease.toString()} label="Building increase %" variant="outlined" onChange={evt =>
                                        this.updateBuildingInput(evt)} fullWidth />

                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.manufacturingIncrease.toString()} label="Manufacturing increase %" variant="outlined" onChange={evt =>
                                        this.updateManufacturingInput(evt)} fullWidth />
                                </Col>

                                <Col md="4">
                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.industryIncrease.toString()} label="Industry increase %" variant="outlined" onChange={evt =>
                                        this.updateIndustryInput(evt)} fullWidth />

                                    <TextField className="m-2" disabled={this.props.isRunning} placeholder={this.state.agricultureIncrease.toString()} label="Agriculture increase %" variant="outlined" onChange={evt =>
                                        this.updateAgricultureInput(evt)} fullWidth />
                                </Col>
                            </Row>


                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

            </>


        return modalBody;
    }


    render() {

        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        const handleSaveAndClose = () => {this.updateChosenCountry(); handleClose()}

        return (
            <>
                <Button variant="primary" onClick={handleShow} id="buttonCountryClick" style={{ display: 'none' }}>
                    Launch demo modal
                </Button>

                <Modal size="lg" show={this.state.show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.country.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="bodyOfModal" style={{ backgroundColor: '#F2F2FA' }}>
                        {this.modalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveAndClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default ModalCountry;