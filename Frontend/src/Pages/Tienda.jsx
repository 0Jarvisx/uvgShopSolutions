import { useEffect, useState } from "react";
import Carrousel from "../Components/Carrousel";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Producto from "../Components/Product";
import Suscribete from "../Components/Suscribirse";
import useApiRequest from "../Hooks/ApiRequest";



export default function Tienda() {
  const { sendRequest } = useApiRequest();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let url = "http://localhost:3000/api/categories/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });
        console.log(responseData);
        if (responseData) {
          setCategories(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    const fetchProducts = async () => {
      let url = "http://localhost:3000/api/products/";
      try {
        const responseData = await sendRequest(url, {
          method: "GET",
        });

        if (responseData) {
          setProducts(responseData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Carrousel />
          <div className="container mx-auto px-4 py-8">
            <Categories categories={categories} />
            <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Producto
                  key={index}
                  name={product.name}
                  item={index}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <Suscribete />
          <Footer />
        </main>
      </div>
    </>
  );
}
