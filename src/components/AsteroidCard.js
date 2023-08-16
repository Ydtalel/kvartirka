import React, { useState } from 'react';

const AsteroidCard = ({ asteroid, distanceUnit }) => {
  const [isInCart, setIsInCart] = useState(false);

  const toggleCart = () => {
    setIsInCart((prevIsInCart) => !prevIsInCart);
  };

  const distance = distanceUnit === 'km'
    ? asteroid.close_approach_data[0].miss_distance.kilometers
    : asteroid.close_approach_data[0].miss_distance.lunar;

  const formattedDistance = typeof distance === 'number'
    ? `${distance.toFixed(2)} ${distanceUnit}`
    : distance;

  return (
    <div className="border p-4 mb-4 flex items-center">
      <div className="flex-shrink-0">
        <img
          src="/planet.png" // Путь к изображению планеты
          alt="Planet"
          className="w-16 h-16"
        />
      </div>
      <div className="ml-4 flex-grow">
        <p className="text-sm">{new Date(asteroid.close_approach_data[0].close_approach_date).toDateString()}</p>
        <p className="text-xl font-semibold">{formattedDistance}</p>
        <p className="text-lg">{asteroid.name}</p>
      </div>
      <div className="flex-shrink-0">
        <img
          src="/asteroid.png" // Путь к изображению астероида
          alt="Asteroid"
          className="w-8 h-8"
        />
      </div>
      <div className="ml-4">
        <p>{(asteroid.estimated_diameter.meters.estimated_diameter_max * 100).toFixed(2)} m</p>
      </div>
      <div className="ml-4">
        {asteroid.is_potentially_hazardous_asteroid && <p>Опасен</p>}
      </div>
      <div className="ml-4">
        <button onClick={toggleCart}>
          {isInCart ? 'В корзине' : 'Заказать'}
        </button>
      </div>
    </div>
  );
};

export default AsteroidCard;
