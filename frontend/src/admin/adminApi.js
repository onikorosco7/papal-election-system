export const loginAdmin = async (email, password) => {
    const res = await fetch('http://localhost:9000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  };  