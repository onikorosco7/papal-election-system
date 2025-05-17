import { useEffect, useState } from 'react';
import './admin.css';

function AdminListaCandidatos() {
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/api/candidatos')
      .then(res => res.json())
      .then(data => setCandidatos(data))
      .catch(() => alert('Error al cargar candidatos'));
  }, []);

  return (
    <div className="admin-container">
      <h2>Lista de Candidatos</h2>
      {candidatos.length === 0 ? (
        <p>No hay candidatos registrados.</p>
      ) : (
        <ul>
          {candidatos.map(c => (
            <li key={c._id}>
              <strong>{c.nombre}</strong> — {c.funcionEclesiastica} ({c.nacionalidad}) — Votos: {c.votos}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminListaCandidatos;