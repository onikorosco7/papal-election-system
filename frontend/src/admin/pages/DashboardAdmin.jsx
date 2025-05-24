import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import './admin.css';

function DashboardAdmin() {
  return (
    <>
      <AdminNavbar />
      <div className="admin-container">
        <h2>Panel de Control del Administrador</h2>
        <ul>
          <li><Link to="/admin/votantes">Ver lista de votantes</Link></li>
          <li><Link to="/admin/candidatos/crear">Registrar nuevo candidato</Link></li>
          <li><Link to="/admin/candidatos">Ver lista de candidatos</Link></li>
          {/* Agrega más opciones si lo necesitas */}
        </ul>
      </div>
    </>
  );
}

export default DashboardAdmin;