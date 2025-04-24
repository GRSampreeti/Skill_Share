import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Avatar,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${id}`);
      setUser(res.data);
    } catch (error) {
      toast({
        title: "Error fetching user",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = async () => {
    try {
      const studentId = prompt("Enter your student ID:");
      const res = await axios.post("http://localhost:8000/api/users/book", {
        studentId,
        teacherId: user._id,
      });

      toast({
        title: "Session booked",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Booking failed",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Spinner size="xl" color="teal.500" />;

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Avatar size="xl" name={user.name} bg="teal.300" />
        <Text fontSize="2xl" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {user.email}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Skills: {user.skills?.join(", ") || "N/A"}
        </Text>
        <Button colorScheme="teal" onClick={handleBookSession}>
          Book Session
        </Button>
      </VStack>
    </Box>
  );
};

export default UserDetail;
