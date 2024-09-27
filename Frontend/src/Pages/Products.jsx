import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Producto from "../Components/Product";
import Filters from "../Components/Filters";
import { useFilters } from "../Hooks/useFilters";
const products = [
  {
    id: 1,
    name: "Iphone 16",
    price: 9999.99,
    description: "Celular ultima generacion",
    category: "Telefonos",
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-hero-240909_inline.jpg.large.jpg",
  },
  {
    id: 2,
    name: "Iphone 15",
    price: 7999.99,
    description: "Celular de la generacion pasada",
    category: "Carro",
    image:
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-IN_817ead95-bff3-4129-866d-3f87976e8be2.jpg?v=1694759321&width=823",
  },
];

export default function Product() {
  const [productsArray] = useState(products);
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(productsArray);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tienda en Línea</h1>
          <Filters />
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
          <Footer />
        </main>
      </div>
    </>
  );
}
