import { useState, useRef } from "react";

export default function AdminProducto() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", image: "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg", price: 9.99, stock: 5 },
    { id: 2, name: "Product 2", image: "https://img.freepik.com/vector-gratis/paisaje-primavera-dibujado-mano_23-2148417650.jpg?w=740&t=st=1727409509~exp=1727410109~hmac=405380ef2ea33c9161f5b822a4840ff83dae8696f80017b951dc8a651a3162c1", price: 19.99, stock: 0 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
  });
  const fileInputRef = useRef(null);

  const addProduct = (e) => {
    e.preventDefault();
    if (
      newProduct.name &&
      newProduct.price > 0 &&
      newProduct.stock >= 0 &&
      newProduct.image
    ) {
      const productToAdd = {
        id: products.length + 1,
        ...newProduct,
      };
      setProducts([...products, productToAdd]);
      setNewProduct({ name: "", price: 0, stock: 0, image: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct((prev) => ({
            ...prev,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: name === "name" ? value : value,
      }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Productos</h2>
      <form onSubmit={addProduct} className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Producto"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            min="0"
            step="0.01"
            required
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border p-2 rounded"
            min="0"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            className="border p-2 rounded"
            required
            ref={fileInputRef}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Crear Producto
          </button>
        </div>
      </form>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Imagen</th>
            <th className="border border-gray-200 p-2 text-left">Nombre</th>
            <th className="border border-gray-200 p-2 text-left">Precio</th>
            <th className="border border-gray-200 p-2 text-left">Stock</th>
            <th className="border border-gray-200 p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={product.stock === 0 ? "bg-gray-200" : ""}
            >
              <td className="border border-gray-200 p-2">{product.id}</td>
              <td className="border border-gray-200 p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="border border-gray-200 p-2">{product.name}</td>
              <td className="border border-gray-200 p-2">Q {product.price}</td>
              <td className="border border-gray-200 p-2">{product.stock}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className={`font-bold py-1 px-2 rounded ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  disabled={product.stock === 0}
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
