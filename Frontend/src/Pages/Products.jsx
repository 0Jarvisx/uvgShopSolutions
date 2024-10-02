import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Producto from "../Components/Product";
import Filters from "../Components/Filters";
import { useFilters } from "../Hooks/useFilters";
import useApiRequest from "../Hooks/ApiRequest";

export default function Product() {
  const [productsArray, setProductsArray] = useState([]);
  const { filterProducts } = useFilters();
  const [categories, setCategories] = useState([]);
  const { sendRequest } = useApiRequest();
  const filteredProducts = filterProducts(productsArray);

useEffect( ()=>{
  const fetchCategories = async () => {
    let url = "http://localhost:3000/api/categories/";
    try {
      const responseData = await sendRequest(url, {
        method: "GET",
      });
      console.log(responseData)
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
      
        setProductsArray(responseData);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  fetchProducts()
  fetchCategories();
}, [])

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tienda en Línea</h1>
          <Filters categories={categories}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Producto
                id={product.id}
                key={index}
                name={product.name}
                item={index}
                image={product.image}
                price={product.price}
                description={product.description}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
