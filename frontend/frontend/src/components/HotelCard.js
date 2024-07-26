import React from 'react';
import { Box, Image, Text, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HotelPage from '../pages/HotelPage';

const HotelCard = ({ hotel }) => {
  return (
    <ChakraLink as={Link} to={`/hotel/${hotel.hotelId}`} _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={4}
        bg="white"
        _hover={{ boxShadow: 'lg' }}
        >
        <Flex>
        <Box w={"30%"}>
        <Image 
          src={hotel.image_link} 
          alt={hotel.name} 
          boxSize="300px" 
          objectFit="cover" 
          w="240" 
          h="240" 
          maxH="200px"
          borderRadius="md"
          />
        </Box>
          <Box w={"70%"}>
        <Text mt={2} fontSize="xl" fontWeight="semibold">Name: {hotel.name}</Text>
        <Text mt={2} color="gray.500">Location: {hotel.location}</Text>
        <Text mt={2} fontWeight="bold">Price: ${hotel.price}</Text>
        </Box>
      </Flex>
        </Box>
    </ChakraLink>
  );
};

export default HotelCard;
