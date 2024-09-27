import { useFilters } from "../Hooks/useFilters";

export default function Filters() {
  const { filters, setFilters } = useFilters();

  const handlePriceChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-row gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Precio
          </label>
          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="10000"
            step="100"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Q 0</span>
            <span>Q {filters.minPrice}</span>
            <span>Q 10,000</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categorías
          </label>
          <select
            id="category"
            name="category"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleCategoryChange}
          >
            <option value="all">Todas</option>
            <option value="celulares">Celulares</option>
            <option value="autos">Autos</option>
            <option value="hogar">Hogar</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>
      </div>
    </section>
  );
}
