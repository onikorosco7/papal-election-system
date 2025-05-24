import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './admin.css';

function AdminListaCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // <-- inicializa navigate

  const fetchCandidatos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Debes iniciar sesión primero');
        setLoading(false);
        return;
      }

      const res = await fetch('http://localhost:9000/api/candidatos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Error al obtener candidatos');
      }

      const data = await res.json();
      setCandidatos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al candidato.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:9000/api/candidatos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Error al eliminar candidato');
        }

        Swal.fire('Eliminado', 'El candidato fue eliminado correctamente', 'success');
        fetchCandidatos();
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  const handleEdit = async (candidato) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Candidato',
      html:
        `<input id="nombre" class="swal2-input" placeholder="Nombre" value="${candidato.nombre}">` +
        `<input id="funcion" class="swal2-input" placeholder="Función Eclesiástica" value="${candidato.funcionEclesiastica}">` +
        `<input id="nacionalidad" class="swal2-input" placeholder="Nacionalidad" value="${candidato.nacionalidad}">`,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value.trim();
        const funcion = document.getElementById('funcion').value.trim();
        const nacionalidad = document.getElementById('nacionalidad').value.trim();

        const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (!nombre || !funcion || !nacionalidad) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        if (!soloLetras.test(nombre)) {
          Swal.showValidationMessage('El nombre solo debe contener letras y espacios');
          return false;
        }

        if (!soloLetras.test(funcion)) {
          Swal.showValidationMessage('La función solo debe contener letras y espacios');
          return false;
        }

        if (!soloLetras.test(nacionalidad)) {
          Swal.showValidationMessage('La nacionalidad solo debe contener letras y espacios');
          return false;
        }

        return {
          nombre,
          funcionEclesiastica: funcion,
          nacionalidad
        };
      },
      confirmButtonText: 'Guardar cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:9000/api/candidatos/${candidato._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formValues)
        });

        if (!res.ok) {
          throw new Error('Error al editar candidato');
        }

        Swal.fire('Actualizado', 'El candidato fue actualizado correctamente', 'success');
        fetchCandidatos();
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  if (loading) return <div className="admin-container">Cargando candidatos...</div>;
  if (error) return <div className="admin-container error">{error}</div>;

  return (
    <div className="admin-container">
      {/* Botón Regresar */}
      <button
        className="btn-regresar"
        onClick={() => navigate('/admin')}
        style={{ marginBottom: '1rem' }}
      >
        ← Regresar
      </button>

      <h2>Lista de Candidatos</h2>
      {candidatos.length === 0 ? (
        <p>No hay candidatos registrados.</p>
      ) : (
        <ul className="candidato-lista">
          {candidatos.map((candidato) => (
            <li key={candidato._id} className="candidato-card">
              <h3>{candidato.nombre}</h3>
              <p><strong>Función Eclesiástica:</strong> {candidato.funcionEclesiastica}</p>
              <p><strong>Nacionalidad:</strong> {candidato.nacionalidad}</p>
              <p><strong>Votos:</strong> {candidato.votos}</p>
              <div className="acciones">
                <button className="btn-editar" onClick={() => handleEdit(candidato)}>Editar</button>
                <button className="btn-eliminar" onClick={() => handleDelete(candidato._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminListaCandidatos;