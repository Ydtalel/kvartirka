// 'Kv3GmARMVkriSISM9czvc0jW86Bdievc4dFUItwX'

import { useState, useEffect } from 'react';
import axios from 'axios';
import AsteroidList from '../components/AsteroidList';

function Home() {
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Начальное количество астероидов на странице

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiKey = process.env.NASA_API_KEY;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      setIsLoading(true);

      const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
        params: {
          start_date: formattedDate,
          api_key: 'Kv3GmARMVkriSISM9czvc0jW86Bdievc4dFUItwX',
          page: 1,
          size: 1,
        },
      });

      const asteroidsData = response.data.near_earth_objects;
      const asteroidsList = Object.values(asteroidsData).flat();

      setAsteroids((prevAsteroids) => [...prevAsteroids, ...asteroidsList]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
      setPageSize((prevPageSize) => prevPageSize + 5); // Увеличиваем количество астероидов на странице при каждой подгрузке
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Asteroid Monitoring App</h1>
      <AsteroidList asteroids={asteroids} />
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <button onClick={fetchData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default Home;



