import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back to user directory or home page
    navigate("/UserDirectory");
  };

  return (
    <Box p={8} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" color="teal.600" mb={4}>
        Successfully Booked
      </Text>
      <Text fontSize="lg" color="gray.700" mb={6}>
        Thank you! Your session has been successfully booked.
      </Text>
      <Button colorScheme="teal" onClick={handleGoBack}>
        Go Back to Directory
      </Button>
    </Box>
  );
};

export default SuccessPage;
