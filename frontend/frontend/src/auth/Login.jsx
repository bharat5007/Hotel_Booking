import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
// import { useUserContext } from "./components/contextapi/XUser";
import { useUserContext } from '../contextapi/XUser';

const Login = () => {
    const {setuser}=useUserContext();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [showp,setshowp]=useState(false);
    const toast=useToast();
    const navigate = useNavigate();
  
    const handleclickp=()=>{
      setshowp(!showp);
    }
    
    const handlesubmit = async () => {
        if (!email || !password) {
          toast({
            title: "Please Fill All the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
      
          // Make the POST request to the login endpoint
          const { data } = await axios.post(
            "http://localhost:8000/user/login",
            { email, password },
            config
          );
      
          // If successful, display success message and handle the response
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
      
          localStorage.setItem("userInfo", JSON.stringify(data));
          setuser(data);
          console.log("User state updated:", data);
          navigate("/home");
      
          // Uncomment and update these lines if you want to navigate to a different route after login
          // history.push("/chats");
      
        } catch (error) {
          // Handle and display error messages
          if (error.response) {
            // Error response from server
            const errorMessage = error.response.data.error || error.response.data.msg || "An unexpected error occurred.";
            toast({
              title: errorMessage,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          } else {
            // Error without response
            toast({
              title: "Login Failed",
              description: "An unexpected error occurred. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        }
      };
    return (
      <div>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input  placeholder='Enter Your email' onChange={(e)=>setemail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel >Enter Password</FormLabel>
          <InputGroup>
          <Input type={showp? "Text":"password"} placeholder='Enter Youre Password' onChange={(e)=>setpassword(e.target.value)} />
          <InputRightElement width={"4.5rem"}>
          <Button h="1.75rem" size="sm" onClick={handleclickp}>
                  {showp ? "Hide": "Show"}
            </Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <Button colorScheme='blue' width={"100%"} style={{marginTop: 15}} onClick={handlesubmit}>Signup</Button>
      </div>
    )
}

export default Login
