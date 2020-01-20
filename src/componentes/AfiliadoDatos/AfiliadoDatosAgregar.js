import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';

export class AfiliadoDatosAgregar extends Component{
    constructor(props){
        super(props);        
        this.state = {snackbaropen: false, snackbarmsj:''}
        this.SubmitForm = this.SubmitForm.bind(this);
    }

    cerrarSnackBar = (event) => {
        this.setState ({snackbaropen: false});
    }

    SubmitForm(event){
        event.preventDefault();

        fetch('http://192.168.0.156:8181/api/AfiliadoDatos/Agregar', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Interno: 0,
                Cuil: parseFloat(event.target.Cuil.value),
                DocTipo: "DNI",
                DocNumero: parseInt(event.target.DocNumero.value),                
                Nombre: event.target.Nombre.value,
                FechaNacimiento: "2019-01-01",
                Nacionalidad: 0,
                Sexo: "",
                Domicilio: "",
                Localidad: 0,
                Telefono: "0303456",
                EstadoCivil: ""
            })
        })
        .then(resultado => resultado.json())
        .then((resultado) => {
          this.setState({snackbaropen: true, snackbarmsj:"Registro agregado!"});
          
        },
        (error) => {
            this.setState({snackbaropen: true, snackbarmsj:error});
        })
    }

    render(){
        return(
            <div className="container">
                <Snackbar
                    anchorOrigin={{vertical: 'center', horizontal: 'center'}}
                    open = {this.state.snackbaropen}
                    autoHideDuration = {3000}
                    onClose = {this.cerrarSnackBar}
                    message = {<span id="message-id">{this.state.snackbarmsj}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="Cerrar"
                            color="inherit"
                            onClick={this.cerrarSnackBar}
                        >
                            x    
                        </IconButton>
                    ]}
                />
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Afiliado
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>                
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.SubmitForm}>
                                <Form.Group controlId="Cuil">
                                    <Form.Label>CUIL</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="Cuil"
                                        required
                                        placeholder="Ingrese CUIL"
                                    />
                                </Form.Group>
                                <Form.Group controlId="Nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Nombre"
                                        required
                                        placeholder="Ingrese Nombre"
                                    />
                                </Form.Group>
                                <Form.Group controlId="DocNumero">
                                    <Form.Label>Nro Documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="DocNumero"
                                        required
                                        placeholder="Ingrese Nro Documento"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Guardar
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Cerrar</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }

}