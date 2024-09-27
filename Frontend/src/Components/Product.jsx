import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";

export default function Producto({
  item,
  id,
  name,
  price,
  description,
  image,
}) {
  const { addItemToCart } = useContext(CarritoContext);

  return (
    <div
      key={"pd-" + item}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="w-full h-52 ">
        <img
          src={image != "" && image ? image : "/No-image.jpg"}
          alt={"product-" + name}
          className="w-full h-full object-contain hover:scale-110"
        />
      </div>
      <div className="px-4 pb-4 pt-2">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Q.{price}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              addItemToCart({
                id,
                name,
                price,
                description,
                image,
                quantity: 1,
              });
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
