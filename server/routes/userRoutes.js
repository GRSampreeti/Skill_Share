// userRoutes.js
const express = require("express");
const router = express.Router();

// Import the controller
const { create, updateProfile, getAllUsers, searchBySkill ,getUserById,bookSession} = require("../controller/userController");


// Define your routes and make sure the handler is a function
router.post("/create", create);
router.put("/update/:email", updateProfile);       //  update own profile
router.get("/all", getAllUsers);                   // display all users
router.get("/search", searchBySkill);              // search by skill
router.get("/:id", getUserById);
router.post("/book", bookSession);



module.exports = router;
