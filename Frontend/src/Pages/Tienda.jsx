import Carrousel from "../Components/Carrousel";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Producto from "../Components/Product";
import Suscribete from "../Components/Suscribirse";


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

const categories = [
    { name: 'Telefonos', image: 'https://gadguat.com.gt/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/03/Banner-Marcas-10.jpg.webp' },
    { name: 'Ropa', image: 'https://1000marcas.net/wp-content/uploads/2019/12/Logo-Gucci.png' },
    { name: 'Hogar', image: 'https://img.global.news.samsung.com/mx/wp-content/uploads/2018/10/Samsung_Wordmark_BLUE.jpg' },
    { name: 'Deporte', image: 'https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg?w=385' },
  ]

export default function Tienda() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Carrousel />
          <div className="container mx-auto px-4 py-8">
            <Categories categories={categories}/>
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
          <Suscribete/>
          <Footer />

        </main>
      </div>
    </>
  );
}
