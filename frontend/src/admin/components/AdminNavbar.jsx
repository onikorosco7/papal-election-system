import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // Puedes crear este archivo para estilos
import { useEffect } from 'react';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <nav className="admin-navbar">
      <div className="logo">🧭 Panel Admin</div>
      <ul className="nav-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/votantes">Votantes</Link></li>
        <li><Link to="/admin/candidatos/crear">Crear Candidato</Link></li>
        <li><Link to="/admin/candidatos">Candidatos</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Cerrar sesión</button></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;