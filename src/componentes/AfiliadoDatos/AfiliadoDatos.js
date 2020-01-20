import React, {Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import {AfiliadoDatosAgregar} from './AfiliadoDatosAgregar'; 

export class AfiliadoDatos extends Component {
    constructor(){
        super();
        this.state = {afiliadodatos:[], addModalShow : false}
    }
    componentDidMount(){
        this.ActualizarLista(); 
    }

    /*componentDidUpdate(){
        this.ActualizarLista();
    }*/

    ActualizarLista(){
        fetch('http://192.168.0.156:8181/api/AfiliadoDatos/ListarXAfiliados?pCantidad=10')
        .then(response => response.json())
        .then((responseJson) => {
            let iterableResponse = Object.values(responseJson);
            iterableResponse.map(item => console.log(item));
            this.setState({afiliadodatos:iterableResponse});
        })
    }

    render(){
    const {afiliadodatos} = this.state;
    let addModalClose=() => this.setState({addModalShow:false}, this.ActualizarLista());

        return (
            <div>
                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({addModalShow:true})}
                        >Agregar</Button>

                    <AfiliadoDatosAgregar
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Interno</th>
                            <th>Nombre</th>
                            <th>CUIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {afiliadodatos.map(afiliadodato=>
                        <tr key = {afiliadodato.Interno}>
                            <td>{afiliadodato.Interno}</td>
                            <td>{afiliadodato.Nombre}</td>
                            <td>{afiliadodato.Cuil}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>                
            </div>
        )
    }
}