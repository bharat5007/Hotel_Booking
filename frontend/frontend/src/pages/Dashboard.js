import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from '../components/HotelCard';
import Filter from '../components/Filter';
import { useUserContext } from '../contextapi/XUser';
import { Flex, Box, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  const {user, startdate, enddate, location, priceRange } = useUserContext();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        console.log(user);
        const params = new URLSearchParams();
        if (startdate) params.append('startDate', startdate);
        if (enddate) params.append('endDate', enddate);
        if (location) params.append('location', location);
        if (priceRange) params.append('maxPrice', priceRange);
        params.append('minPrice', 0);

        const { data } = await axios.get(`http://localhost:8000/hotel/hotels?${params.toString()}`);
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [startdate, enddate, location, priceRange]);

  const fun=(x)=>{console.log(x)}

  return (
    <Flex>
      <Box w="30%" p={4}>
        <Filter />
      </Box>
      <Box w="70%" p={4}>
        <Heading as="h1" mb={4}>Available Hotels</Heading>
        <Flex direction="column" gap={4}>
          {hotels.map((hotel) => (
            <Box
              key={hotel.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={4}
              bg="white"
              w="100%"
            >
              {/* {console.log(hotel)} */}
              <HotelCard hotel={hotel} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
