

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>CRUD de Registro de Personas</h1>
      </div>
      <div className="navbar-right" >
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/agregarRegistro" className="navbar-link">Agregar Registro</Link>
        <Link to="/buscarRegistro" className="navbar-link">Buscar Registro</Link>
        <Link to="/modificarRegistros" className="navbar-link">Modificar Registros</Link>
        <Link to="/listarRegistros" className="navbar-link">Listar Registros</Link>
        <Link to="/eliminarRegistros" className="navbar-link">Eliminar Registros</Link>
      </div>
    </div>
  );
};

export default Navbar;








