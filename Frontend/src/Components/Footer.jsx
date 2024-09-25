
export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
          <p className="text-gray-600">Ecommerce de UVG</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Te podria interesar</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">PORTAL</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">UVG CAMPUS SUR</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">FUNDACION UVG</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">POLITICAS</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contactanos</h3>
          <p className="text-gray-600">Km 92.5 Carretera a Mazatenango</p>
          <p className="text-gray-600">Email: ayuda@gmail.com</p>
          <p className="text-gray-600">Phone: +502 2345-6789</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
        © 2024 UVG-SHOPSOLUTIONS. All rights reserved.
      </div>
    </div>
  </footer>
    </>
  );
}
