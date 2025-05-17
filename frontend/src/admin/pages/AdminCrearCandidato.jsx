import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function AdminCrearCandidato() {
  const [nombre, setNombre] = useState('');
  const [funcionEclesiastica, setFuncionEclesiastica] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Debes iniciar sesión primero');
      return;
    }

    const res = await fetch('http://localhost:9000/api/candidatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, funcionEclesiastica, nacionalidad }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Candidato creado con éxito');
      navigate('/admin/candidatos');
    } else {
      alert(data.error || '❌ Error al crear candidato');
    }
  };

  return (
    <div className="admin-container">
      <h2>Crear Nuevo Candidato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Función Eclesiástica"
          value={funcionEclesiastica}
          onChange={(e) => setFuncionEclesiastica(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
          required
        />
        <button type="submit">Crear Candidato</button>
      </form>
    </div>
  );
}

export default AdminCrearCandidato;