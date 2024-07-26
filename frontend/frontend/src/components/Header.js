import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contextapi/XUser';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {setuser}=useUserContext();
  const navigate = useNavigate();

  const handleclick=()=>{
      localStorage.removeItem("userInfo");
      setuser(null);
      navigate("/");
      // history.push("/");
  }
  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      bg="white" 
      w="100%" 
      p="5px 10px" 
      borderWidth="5px"
    >
      <Flex as="nav">
        <Flex as="ul" listStyleType="none" m="0" p="0" display="flex">
          <Box as="li" mr="10px">
            <Button onClick={()=> navigate('/home')}>Home</Button>
          </Box>
          <Box as="li" mr="10px">
            <Button to="/profile">Profile</Button>
          </Box>
          <Box as="li">
            <Button onClick={handleclick}>Logout</Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
