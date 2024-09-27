import CardCategory from "./CardCategory";

export default function Categories({ categories }) {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Cateogorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CardCategory
          key={index}
            name={category.name}
            item={index}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}
