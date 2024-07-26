import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await axios.get(`http://localhost:8000/hotels/${id}`);
      setHotel(data);
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>
      <p>Price: ${hotel.price}</p>
      <p>{hotel.description}</p>
      <button>Book Now</button>
    </div>
  );
};

export default HotelPage;