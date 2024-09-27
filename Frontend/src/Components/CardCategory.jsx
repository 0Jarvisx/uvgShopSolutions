export default function CardCategory({item, image, name}) {
  return (
    <div
      key={'cardCategory-'+item}
      className="relative group overflow-hidden rounded-lg shadow-md"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-semibold">{name}</h3>
      </div>
    </div>
  );
}
