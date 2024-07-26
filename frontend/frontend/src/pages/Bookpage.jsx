import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useUserContext } from '../contextapi/XUser';
import axios from 'axios';

const BookPage = () => {
    const { id } = useParams(); 
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const numberOfRooms = query.get('numberofrooms');
    const {user, startdate, enddate} = useUserContext();
    const [seconds, setSeconds] = useState(10);
    const toast = useToast();
    const navigate = useNavigate();
    const [Result,setResult]=useState();
    const booking = async () => {
        try {
            console.log(user._id);
          const response = await axios.post('http://localhost:8000/book', {
            startdate,
            enddate,
            userId: user._id,
            hotelId: id,
            numberofrooms: numberOfRooms,
          });
      
          if (response.data) {
            // Assuming `result` is a state variable
            setResult(1); // Set result to 1 on success
          }
        } catch (error) {
          console.error('Error booking room:', error);
          // Handle the error, possibly by setting result to a failure state
          setResult(0); // Set result to 0 on failure
        }
      };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if(seconds===9) booking();

    if (seconds === 0) {
      clearInterval(timer);
      // Simulate booking success or failure
      const isSuccess = Result; // Randomly decide success or failure
      if (isSuccess) {
        toast({
          title: 'Booking Successful',
          description: "Your booking has been confirmed.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Booking Failed',
          description: "There was an issue with your booking.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      // Redirect to home page after the toast is shown
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    }

    return () => clearInterval(timer);
  }, [seconds, toast, navigate]);

  return (
    <VStack justify="center" align="center" h="100vh">
      <Heading size="2xl">Booking in progress...</Heading>
      <Text fontSize="4xl">{seconds}</Text>
    </VStack>
  );
};

export default BookPage;
