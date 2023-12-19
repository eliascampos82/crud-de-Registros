

function Fondo() {
  return (
    <div className="fondo">
       <p>Este es un crud de registro de Personas
        vas a poder Agregar registros , Modificar Registros
        Buscar Registros y Eliminar Registros , Listar Registros
        todo guardado en una base de datos
       </p>
       <div>
          <h3 style={{color:"red"}}>AGREGAR REGISTROS</h3>
          <p>En esta Seccion vas a poder agregar Registros/Personas a la base de datos con los campos</p>
          <p>Dni, Nombres, Apellidos</p>
       </div>
       <div>
          <h3 style={{color:"red"}}>BUSCAR REGISTROS</h3>
          <p>En esta Seccion vas a poder buscar si existe un/as registros/Personas en la base de datos,</p>
          <p>si existe te muestra el registro detallado de esa persona</p>
       </div>
       <div>
          <h3 style={{color:"red"}}>MODIFICAR REGISTROS</h3>
          <p>En esta Seccion vas a poder ver los registros y Modificarlos de la base de datos</p>
          <p>vas a poder modificar los  tres campos afectados</p>
       </div>
       <div>
          <h3 style={{color:"red"}}>LISTAR REGISTROS</h3>
          <p>En esta Seccion vas a poder ver los registros de la base de datos</p>
       </div>
       <div>
          <h3 style={{color:"red"}}>ELIMINAR REGISTROS</h3>
          <p>En esta Seccion vas a poder ver el registro seleccionado por DNI y eliminar los registros de la base de datos</p>
       </div>

    </div>
  )
}

export default Fondo