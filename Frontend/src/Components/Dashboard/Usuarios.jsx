import { useState } from "react";

export default function AdminUsuario() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const addUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.password) {
      const productToAdd = {
        id: users.length + 1,
        ...newUser,
      };
      setUsers([...users, productToAdd]);
      setNewUser({ name: "", email: "", password: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewUser((prev) => ({
            ...prev,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: name === "name" ? value : value,
      }));
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <form onSubmit={addUser} className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.price}
            onChange={handleInputChange}
            placeholder="email"
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={newUser.stock}
            onChange={handleInputChange}
            placeholder="******"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Crear Usuario
          </button>
        </div>
      </form>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Nombre</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-200 p-2">{user.id}</td>
              <td className="border border-gray-200 p-2">{user.name}</td>
              <td className="border border-gray-200 p-2">{user.email}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
