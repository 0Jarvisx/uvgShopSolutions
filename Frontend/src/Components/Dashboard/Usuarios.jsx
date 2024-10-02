import { useContext, useState } from "react";
import useApiRequest from "../../Hooks/ApiRequest";
import { AuthContext } from "../../Context/AuthContext";

export default function AdminUsuario({ users, setUsers }) {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
    phoneNumber: "",
  });

  const { sendRequest } = useApiRequest();

  const addUser = async (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.password) {
      let url = "http://localhost:3000/api/users/";

      try {
        const responseData = await sendRequest(url, {
          method: "POST",
          body: JSON.stringify(newUser),
        });

        if (responseData) {
          setUsers((prev) => [...prev, responseData]);
          setNewUser({
            name: "",
            email: "",
            password: "",
            rol: "",
            phoneNumber: "",
          });
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteUser = async (id) => {
    let url = `http://localhost:3000/api/users/${id}`;
    try {
      await sendRequest(url, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <form onSubmit={addUser} className="mb-4">
        {" "}
        {/* Cambiado aquí */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="rol"
            value={newUser.rol}
            onChange={handleInputChange}
            placeholder="Rol"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            placeholder="Telefono"
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
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
          {users.map((tuser) => (
            <tr key={tuser.id}>
              <td className="border border-gray-200 p-2">{tuser.id}</td>
              <td className="border border-gray-200 p-2">{tuser.name}</td>
              <td className="border border-gray-200 p-2">{tuser.email}</td>
              <td className="border border-gray-200 p-2">
                <button
                disabled={user.id === tuser.id}
                  onClick={() => deleteUser(tuser.id)}
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
