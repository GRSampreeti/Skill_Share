// pages/Register.jsx
import React, { useState } from "react";
import {
  Container, VStack, Input, Button, FormControl,
  FormLabel, Heading, Avatar, Textarea, Switch, Text
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password_hash: "",
    name: "",
    cpassword: "",
    skill_tag: "",
    course_title: "",
    course_description: "",
    credits_required: 1,
    is_teaching: false,
  });

  const [message, setMessage] = useState("");
  const [imgPrev, setImgPrev] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password_hash !== form.cpassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/users/create", form);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Container py="10">
      <VStack spacing={4}>
        <Heading fontSize="28">Register</Heading>
        {imgPrev && <Avatar size="2xl" src={imgPrev} />}
        {message && <Text color="red.500">{message}</Text>}
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <FormControl isRequired mb="3">
            <FormLabel>Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mb="3">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mb="3">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password_hash" value={form.password_hash} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mb="3">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="cpassword" value={form.cpassword} onChange={handleChange} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Skill Tag</FormLabel>
            <Input name="skill_tag" value={form.skill_tag} onChange={handleChange} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Course Title</FormLabel>
            <Input name="course_title" value={form.course_title} onChange={handleChange} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Course Description</FormLabel>
            <Textarea name="course_description" value={form.course_description} onChange={handleChange} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Credits Required</FormLabel>
            <Input type="number" name="credits_required" value={form.credits_required} onChange={handleChange} />
          </FormControl>
          <FormControl display="flex" alignItems="center" mb="4">
            <FormLabel htmlFor="is_teaching" mb="0">Teaching?</FormLabel>
            <Switch id="is_teaching" name="is_teaching" isChecked={form.is_teaching} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" w="full">Register</Button>
        </form>
        <Text>Already have an account? <Link to="/login" style={{ color: "#319795" }}>Login</Link></Text>
      </VStack>
    </Container>
  );
};

export default Register;
