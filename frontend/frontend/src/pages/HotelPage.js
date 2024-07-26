import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Text, VStack, HStack, Divider, Container, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useUserContext } from '../contextapi/XUser';
import { useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';
// import { MdLocationOn } from 'react-icons/md';

const HotelPage = () => {
  const { startdate, enddate } = useUserContext();
  const { id } = useParams();  
  const [hotelData, sethotelData] = useState(null);  // Initialize with null
  const [numRooms, setNumRooms] = useState(1);  // Initialize number of rooms to be booked
  const navigate=useNavigate();

  const fetchHotel = async () => {
    try {
      const params = new URLSearchParams();
      if (startdate) params.append('startDate', startdate);
      if (enddate) params.append('endDate', enddate);
      if (id) params.append('id', id);
      const { data } = await axios.get(`http://localhost:8000/hotel/hotel?${params.toString()}`);
      // Ensure rules are set
      data.rules = data.rules || [
        'Check-in: From 10:00 to 00:00',
        'Check-out: From 10:00 to 11:00',
        'Cancellation/ prepayment policies vary according to accommodation type.',
        'Children are not allowed.',
        'Pets are not allowed.',
        'Parties/events are not allowed.',
      ];
      sethotelData(data);
      console.log("Data received:", data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {      
    fetchHotel();
  }, [id]);

  useEffect(() => {
    console.log("Updated hotelData:", hotelData);
  }, [hotelData]);

  if (!hotelData) {
    return <div><Header />Loading...</div>;  // Display a loading state while fetching data
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" py="6">
        <Box position="relative" mb="6">
          <Button
            position="absolute"
            top="4"
            right="4"
            colorScheme="teal"
            size="lg"
            onClick={() => navigate(`/booking/${id}?numberofrooms=${numRooms}`)}
          >
            Book Now
          </Button>
          <Box position="absolute" top="16" right="4">
            <NumberInput
              min={1}
              max={hotelData[0].unbookedRooms}
              value={numRooms}
              onChange={(value) => setNumRooms(value)}
              size="md"
              maxW="100px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text mt="2" fontSize="sm" color="gray.500">Rooms to book</Text>
          </Box>
          <Heading as="h2" size="xl">{hotelData[0].name}</Heading>
          <HStack mt="2">
            {/* <Icon as={MdLocationOn} w={6} h={6} color="gray.500" /> */}
            <Text color="gray.500">{hotelData[0].location}</Text>
          </HStack>
        </Box>

        <HStack spacing="4" mb="6" overflowX="scroll">
          {/* {  hotelData.image_link.map((src, idx) => ( */}
          <Image key={"image"} src={hotelData[0].image_link} alt={`Hotel Image`} boxSize="200px" objectFit="cover" borderRadius="md" />
          {/* // ))} */}
        </HStack>

        <Divider mb="6" />

        {/* <Text fontSize="lg" mb="6">{hotelData.description}</Text> */}

        <Divider mb="6" />

        <Box>
          <Heading as="h4" size="md" mb="4">House rules</Heading>
          <VStack align="start" spacing="4">
            {hotelData.rules.map((rule, idx) => (
              <HStack key={idx} align="start">
                {/* <Icon as={FaCheckCircle} w={5} h={5} color="teal.500" /> */}
                <Text fontSize="md">{rule}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default HotelPage;
