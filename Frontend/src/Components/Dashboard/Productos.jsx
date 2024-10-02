import { useState, useRef } from "react";
import useApiRequest from "../../Hooks/ApiRequest";

export default function AdminProducto({ products, setProducts, categories }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: categories[0].id,
    description: "",
    image: "",
  });
  const { sendRequest } = useApiRequest();
  const fileInputRef = useRef(null);

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    if (
      newProduct.name &&
      newProduct.price > 0 &&
      newProduct.stock >= 0 &&
      newProduct.image &&
      newProduct.category
    ) {
      const url = "http://localhost:3000/api/products/";

      try {
        const formData = new FormData();

        formData.append("file", fileInputRef.current.files[0]);
        formData.append("category", newProduct.category);
        const urlImage = 'http://localhost:3000/api/products/upload'
        const responseDataImage =true /*  await sendRequest(urlImage, {
          method: "POST",
          body: formData,
        });
        let newUrl = ""; */
        if (responseDataImage) {
          //newUrl = responseDataImage.file.location;

          const responseData = await sendRequest(url, {
            method: "POST",
            body: JSON.stringify({ ...newProduct, /* image: newUrl */ }),
          });

          if (responseData) {
            setProducts((prev) => [...prev, responseData]);
            setNewProduct({
              name: "",
              price: 0,
              stock: 0,
              image: "",
              category: "",
            });

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        }
      } catch (err) {
        console.error("Error:", err.message);
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
      console.log(value, name);
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
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Descripcion"
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
          <select
            id="category"
            name="category"
            value={newProduct.category}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleInputChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
