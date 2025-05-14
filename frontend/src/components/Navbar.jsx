import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Inicio</Link></li>
        <li><Link to="/registro-votante" className="nav-link">Registro</Link></li>
        <li><Link to="/votar" className="nav-link">Votar</Link></li>
        <li><Link to="/ganadores" className="nav-link">Ganadores</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;