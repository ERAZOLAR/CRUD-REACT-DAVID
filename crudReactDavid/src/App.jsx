import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // IMPORTA LIBRERIA MINIMIZADA - MAS EFECTIVA
import {  Table, Button, Container, Modal, ModalHeader, ModalBody,
  FormGroup, ModalFooter, Alert } from "reactstrap"; // IMPORTA COMPONENTES DE LIBRERIA REACTSTRAP



  // CREAMOS ARRAY PARA PRODUCTOS DE MOTOS, DEJAMOS SOLO 5 PARA VER INTERACCION CRUD
const productos = [
  { id: 1, nombre: "Filtro de aire", caracteristicas: "Lavable y reutilizable" },
  { id: 2, nombre: "Bujía de iridio", caracteristicas: "Mayor durabilidad y mejor rendimiento" },
  { id: 3, nombre: "Pastillas de freno", caracteristicas: "Alta resistencia al desgaste" },
  { id: 4, nombre: "Llanta trasera", caracteristicas: "Diseño deportivo y agarre óptimo" },
  { id: 5, nombre: "Escape deportivo", caracteristicas: "Mejora el sonido y el rendimiento del motor" },
  // { id: 6, nombre: "Cadena de transmisión", caracteristicas: "Alta resistencia a la tracción" },
  // { id: 7, nombre: "Manillar deportivo", caracteristicas: "Mayor comodidad y control en la conducción" },
  // { id: 8, nombre: "Amortiguador trasero", caracteristicas: "Ajustable y absorción de impactos eficiente" },
  // { id: 9, nombre: "Kit de carenado", caracteristicas: "Diseño aerodinámico y protección contra el viento" },
  // { id: 10, nombre: "Faro LED", caracteristicas: "Mayor visibilidad y menor consumo de energía" },
  // { id: 11, nombre: "Embrague reforzado", caracteristicas: "Mayor resistencia al desgaste y mejor agarre" },
  // { id: 12, nombre: "Radiador de aceite", caracteristicas: "Mejora la refrigeración del motor" },
  // { id: 13, nombre: "Kit de pegatinas", caracteristicas: "Personalización y protección contra rayones" },
  // { id: 14, nombre: "Caballete lateral", caracteristicas: "Facilita el estacionamiento y mantenimiento de la moto" },
  // { id: 15, nombre: "Cúpula deportiva", caracteristicas: "Reducción de la resistencia al viento" },
  // { id: 16, nombre: "Kit de transmisión", caracteristicas: "Incluye cadena, piñón y corona de alta calidad" },
  // { id: 17, nombre: "Manetas ajustables", caracteristicas: "Adaptación a la ergonomía del piloto" },
  // { id: 18, nombre: "Kit de luces auxiliares", caracteristicas: "Mejora la visibilidad en condiciones de poca luz" },
  // { id: 19, nombre: "Guardabarros delantero", caracteristicas: "Protección contra salpicaduras y suciedad" },
  // { id: 20, nombre: "Asiento confort", caracteristicas: "espuma media densidad"}
];




// SE DEFINE LA CLASE QUE HEREDA DE REACT.COMPONENT
class App extends React.Component {
  state = {
    data: productos,      
    modalActualizar: false,   
    modalInsertar: false,     
    // SE TRAE INFORMACION DEL FORMULARIO
    form: {
      id: "",
      nombre: "",
      caracteristicas: "",
    },
    // SE DETERMINA UN MENSAJE PARA CONFIRMACIONES EN CRUD
    mensaje: ""
    
  };



_________________________________________________________________________
  // SE DEFINEN EL COMPORTAMINTO DE LOS MODALES CREAR NUEVO PRODUCTO -> ABRIR Y CERRAR

 mostrarModalInsertar = () => {
  this.setState({
    modalInsertar: true,
  });
  
};

cerrarModalInsertar = () => {
  this.setState({ modalInsertar: false });
 
};

_______________________________________________________________________
// SE DEFINEN EL COMPORTAMINTO DE LOS MODALES EN EDITAR -> ABRIR Y CERRAR

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };



__________________________________________________________________
  // SE DEFINE FUNCION CREAR NUEVO PDCTO CON EL CAMBIO DE ESTA

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    //this.setState({ mensaje: "Producto Guardado con Exito" });
    this.setState({ mensaje: (
      <span style={{ color: "green" }}>Producto Agregado con Exito</span>) });
    this.setState({ modalInsertar: false, data: lista });

    setTimeout(() => {
      this.setState({ mensaje: "" });
    }, 4000);
    
    
    
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      
    });
    
  };
 
___________________________________________________________________
  // SE DEFINE FUNCION EDITAR PRODUCTO

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].caracteristicas = dato.caracteristicas;
      }
      contador++;
    });
    this.setState({ mensaje: (
      <span style={{ color: "blue" }}>Producto Editado Correctamente</span>) });
    this.setState({ data: arreglo, modalActualizar: false });

    setTimeout(() => {
      this.setState({ mensaje: "" });
    }, 4000);
    
  };


  ________________________________________________________________
  // SE DEFINE FUNCION ELIMINAR

  eliminar = (dato) => {
    var opcion = window.confirm("!! ... Desea Eliminar El Producto ...  " + dato.nombre + " .... " + "con id #" + dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      // this.setState({ mensaje: "Producto Eliminado con Exito" });
      this.setState({ mensaje: (
        <span style={{ color: "red" }}>Producto Eliminado con Exito</span>) });
      this.setState({ data: arreglo, modalActualizar: false });

      setTimeout(() => {
        this.setState({ mensaje: "" });
      }, 4000);
    }
  };

________________________________________________________________
 // SE DEFINE FUNCION BUSCAR PRODUCTO

  buscarProducto = (e) => {
    const filtro = e.target.value.toLowerCase();
  
    const productosFiltrados = filtro.length === 0 ? this.state.data.slice() : this.state.data.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(filtro) ||
        producto.caracteristicas.toLowerCase().includes(filtro)
      );
    });
  
    this.setState({ data: productosFiltrados });
  };

  
      


  


___________________________________________________________________
  // VALORES A MOSTRAR DENTRO DEL APLICATIVO

  render() {
    
    return (
      <>
        <Container>

        <div>

          {/*SE TRAE EL MENSAJE SEGUN CADA ACCION DE CRUD */}

        {this.state.mensaje && (
          <Alert variant="success" onClose={() => this.setState({ mensaje: "" })}>
          {this.state.mensaje}
        </Alert>
      )}
                  
          
          
        </div>

        

        <h3>"EL RUN RUNEO" Motorbike Productos</h3>
        <br />
        {/* SE CREA EL BOTON PARA AGREGAR NUEVO PRODUCTO*/}
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear Nuevo Producto</Button>
          <br />
          <br />

          <input 
            type="text"
            className="form-control"
            placeholder="Busca un Producto..."
            onChange={this.buscarProducto}
            style={{ textAlign: "center" }}
          />



          {/* SE DA CONSTRUCCION A LA TABLA */}
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Caracteristicas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {/* SE RECORRE EL ARRAY Y SE TRAE CADA DATO */}
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.caracteristicas}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}>Editarlo</Button>{" "}                 
                     
                    
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminarlo</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>


{/*-------------------------------------------------------------- */}
        {/* TRAEMOS MODAL PARA CREAR NUEVO PRODUCTO */}


        <Modal  isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Crear Nuevo Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                caracteristicas: 
              </label>
              <input
                className="form-control"
                name="caracteristicas"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            > Guardar Nuevo Producto </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            > Cancelar </Button>
          </ModalFooter>
        </Modal>


{/*-------------------------------------------------------------- */}
        {/* TRAEMOS MODAL PARA EDITAR */}

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Producto Seleccionado</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Caracteristicas: 
              </label>
              <input
                className="form-control"
                name="caracteristicas"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.caracteristicas}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button 
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>


        




      </>
    );
  }
}
export default App;
