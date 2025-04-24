import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Spinner,
  useToast,
  Divider,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";

const UserDirectory = () => {
  const [skill, setSkill] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // ✅ use inside the component

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/users/all");
      setUsers(res.data);
    } catch (error) {
      toast({
        title: "Error fetching users",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (skill.trim() === "") return getAllUsers();
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/users/search?skill=${skill}`
      );
      setUsers(res.data);
    } catch (error) {
      toast({
        title: "Error during search",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/user/${id}`); // ✅ navigate to the user details page
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" color="teal.600" mb={4}>
        User Directory
      </Text>

      <HStack spacing={4} mb={6}>
        <Input
          placeholder="Search by skill..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          borderColor="teal.300"
          focusBorderColor="teal.500"
        />
        <Button colorScheme="teal" onClick={handleSearch} isLoading={loading}>
          Search
        </Button>
      </HStack>

      <Divider mb={4} />

      {loading ? (
        <Spinner size="lg" color="teal.500" />
      ) : users.length === 0 ? (
        <Text color="gray.500">No users found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {users.map((user) => (
            <Box
              key={user._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor="teal.200"
              _hover={{ bg: "teal.50", cursor: "pointer" }}
              boxShadow="md"
              textAlign="center"
              onClick={() => handleClick(user._id)} // Pass user id on click
            >
              <Avatar
                name={user.name}
                size="md"
                mb={2}
                mx="auto"
                bg="teal.300"
                color="white"
              />
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                {user.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {user.email}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default UserDirectory;
