import { ShoppingCart, User, Search } from 'lucide-react'
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold">UVG SHOP SOLUTIONS</div>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Inicio</Link></li>
         
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Productos</Link></li>
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Sobre Nosotros</Link></li>
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Contacto</Link></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to=""className="text-gray-600 hover:text-gray-900">
          <Search className="h-6 w-6" />
        </Link>
        <Link to= "login" className="text-gray-600 hover:text-gray-900">
          <User className="h-6 w-6" />
        </Link>
        <Link to="" className="text-gray-600 hover:text-gray-900">
          <ShoppingCart className="h-6 w-6" />
        </Link>
      </div>
    </div>
  </header>
    );
}