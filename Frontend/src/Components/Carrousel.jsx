import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const slides = [
    {
      image:
        "https://www.maowdesign.com/wp-content/uploads/2017/07/rebajas-de-verano-2017.jpg",
      title: "Summer Sale",
      description: "Hasta un 50% de descuento",
    },
    {
      image:
        "https://cdn.vectorstock.com/i/1000v/02/15/new-arrival-sticker-tag-or-banner-with-megaphone-vector-28850215.avif",
      title: "Nuevos Lanzamientos",
      description: "Nueva Colección",
    },
    {
      image:
        "https://as1.ftcdn.net/v2/jpg/05/21/57/80/1000_F_521578071_zBREJ6MuET5peQjhYTrMYptGS6cFyRbB.jpg",
      title: "Envio Gratis",
      description: "En compras mayores a Q.100.00",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setTimeLeft(10);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    setTimeLeft(10);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setTimeLeft(10);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          nextSlide();
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-96 object-fill"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {timeLeft}s
      </div>
    </div>
  );
}
