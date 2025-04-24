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

const UserProfile = () => {
  const { id } = useParams();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = "6809b52b24b12445ae130383"; // Replace with actual auth logic

  const getUser = async () => {
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
      const res = await axios.post("http://localhost:8000/api/users/book", {
        studentId: studentId,
        teacherId: user._id,
      });

      toast({
        title: "Session Booked",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (loading) return <Spinner size="xl" color="teal.500" mt={10} />;

  if (!user) return <Text mt={10}>User not found.</Text>;

  return (
    <Box p={8}>
      <VStack spacing={4} align="center">
        <Avatar name={user.name} size="xl" />
        <Text fontSize="2xl" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {user.email}
        </Text>
        <Text fontSize="md" color="gray.600">
          Skill: {user.skill_tag}
        </Text>
        {user.is_teaching && (
          <>
            <Text fontWeight="semibold" fontSize="lg">
              Teaching: {user.course_title}
            </Text>
            <Text textAlign="center" color="gray.600">
              {user.course_description}
            </Text>
            <Text color="gray.700">
              Credits Required: {user.credits_required}
            </Text>
            <Button colorScheme="teal" onClick={handleBookSession}>
              Book Session
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default UserProfile;
