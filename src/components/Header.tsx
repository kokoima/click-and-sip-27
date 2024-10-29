import { useState, useEffect } from 'react';
import { Establishment } from '../types';

interface HeaderProps {
  establishment: Establishment;
}

export const Header = ({ establishment }: HeaderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === establishment.images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [establishment.images.length]);

  return (
    <div className="relative h-[300px]">
      {establishment.images.map((image, index) => (
        <div
          key={image}
          className={`carousel-slide ${
            index === currentImageIndex ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <img
            src={image}
            alt={`${establishment.name} ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h1 className="text-3xl font-bold text-white">{establishment.name}</h1>
        <p className="text-white/80">{establishment.description}</p>
      </div>
    </div>
  );
};