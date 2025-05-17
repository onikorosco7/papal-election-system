import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function RegisterAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:9000/api/admin/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Administrador creado correctamente');
      navigate('/admin/login'); // redirige a login tras registro exitoso
    } else {
      alert(data.mensaje || 'Error al registrar administrador');
    }
  };

  return (
    <div className="admin-container">
      <h2>Registrar Administrador</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterAdmin;