// pages/Login.jsx
import React, { useState } from "react";
import {
  Container, VStack, Input, Button, FormControl,
  FormLabel, Heading, Text
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/api/users/all");
      const users = res.data;
      const user = users.find(u => u.email === email && u.password_hash === password_hash);

      if (user) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/UserDirectory"), 1500); // Redirect to homepage
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <Container py="10">
      <VStack spacing={4}>
        <Heading fontSize="28">Login</Heading>
        {message && <Text color="red.500">{message}</Text>}
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <FormControl isRequired mb="4">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired mb="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password_hash} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" w="full">Login</Button>
        </form>
        <Text>Don't have an account? <Link to="/register" style={{ color: "#319795" }}>Register</Link></Text>
      </VStack>
    </Container>
  );
};

export default Login;
