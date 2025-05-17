import { Routes, Route, Navigate } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import RegisterAdmin from './pages/RegisterAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import VotantesAdmin from './pages/VotantesAdmin';
import AdminCrearCandidato from './pages/AdminCrearCandidato';
import AdminListaCandidatos from './pages/AdminListaCandidatos';

function AdminRoutes() {
  return (
    <Routes>
      {/* Redirige /admin al dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/admin/registrar" element={<RegisterAdmin />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/votantes" element={<VotantesAdmin />} />
      <Route path="/admin/candidatos/crear" element={<AdminCrearCandidato />} />
      <Route path="/admin/candidatos" element={<AdminListaCandidatos />} />
    </Routes>
  );
}

export default AdminRoutes;