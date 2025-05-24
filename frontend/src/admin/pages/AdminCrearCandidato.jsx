import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './admin.css';

function AdminCrearCandidato() {
  const [nombre, setNombre] = useState('');
  const [funcionEclesiastica, setFuncionEclesiastica] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const navigate = useNavigate();

  // Solo acepta letras y espacios
  const soloLetras = (valor) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(valor);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('adminToken');
    if (!token) {
      Swal.fire('Error', 'Debes iniciar sesión primero', 'error');
      return;
    }

    if (!nombre || !funcionEclesiastica || !nacionalidad) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'warning');
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
      await Swal.fire('✅ Candidato creado', 'El candidato fue creado con éxito', 'success');
      navigate('/admin/candidatos');
    } else {
      Swal.fire('❌ Error', data.error || 'Error al crear candidato', 'error');
    }
  };

  return (
    <div className="admin-container">
      <button
        className="btn-regresar"
        onClick={() => navigate('/admin/candidatos')}
        style={{ marginBottom: '1rem' }}
      >
        ← Regresar
      </button>
      <h2>Crear Nuevo Candidato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => {
            if (soloLetras(e.target.value)) setNombre(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Función Eclesiástica"
          value={funcionEclesiastica}
          onChange={(e) => {
            if (soloLetras(e.target.value)) setFuncionEclesiastica(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChange={(e) => {
            if (soloLetras(e.target.value)) setNacionalidad(e.target.value);
          }}
          required
        />
        <button type="submit">Crear Candidato</button>
      </form>
    </div>
  );
}

export default AdminCrearCandidato;