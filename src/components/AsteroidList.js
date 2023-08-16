import React, { useState } from 'react';
import AsteroidCard from './AsteroidCard';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const roundToInteger = (number) => Math.floor(number);

const AsteroidList = ({ asteroids }) => {
  const [distanceUnit, setDistanceUnit] = useState('km');

  const toggleDistanceUnit = () => {
    setDistanceUnit((prevUnit) => (prevUnit === 'km' ? 'lunar' : 'km'));
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <img src="path-to-earth-image" alt="Earth" />
      </div>
      <div className="w-2/3 p-4">
        <div className="flex justify-end mb-4">
          <button onClick={toggleDistanceUnit}>
            Переключить дистанцию: {distanceUnit === 'km' ? 'в лунные орбиты' : 'в километры'}
          </button>
        </div>
        {asteroids.map((asteroid) => (
          <AsteroidCard
            key={asteroid.id}
            asteroid={asteroid}
            distanceUnit={distanceUnit}
            formatDate={formatDate}
            roundToInteger={roundToInteger}
          />
        ))}
      </div>
    </div>
  );
};

export default AsteroidList;
