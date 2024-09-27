export default function Suscribete (){
    
    return(
        <div className="bg-gray-200 py-12 my-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Suscribete y Aprovecha</h2>
              <p className="text-gray-600 mb-6">Ofertas Exclusivas!</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Ingresa tu Email"
                  className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      )
}