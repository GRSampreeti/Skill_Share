// userController.js
const User = require("../model/userModel");
const nodemailer = require("nodemailer");

const create = async (req, res) => {
  try {
    const { email, password_hash, name, skill_tag, course_title, course_description, credits_required, is_teaching } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const newUser = new User({
      email,
      password_hash,
      name,
      skill_tag,
      course_title,
      course_description,
      credits_required,
      is_teaching
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const searchBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) {
      return res.status(400).json({ message: "Skill query is required" });
    }

    const users = await User.find({ skill_tag: { $regex: skill, $options: "i" } });

    res.json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// New controller function
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const bookSession = async (req, res) => {
  const { studentId, teacherId } = req.body;

  try {
    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    if (!student || !teacher) {
      return res.status(404).json({ message: "Student or Teacher not found" });
    }

    if (student.credits < teacher.credits_required) {
      return res.status(400).json({ message: "Insufficient credits to book the session" });
    }

    student.credits -= teacher.credits_required;
    teacher.credits += teacher.credits_required;

    await student.save();
    await teacher.save();

    // Email notification (dummy config—replace with your email & password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: [student.email, teacher.email],
      subject: 'Session Booking Confirmation',
      text: `Dear ${student.name},\n\nYour session with ${teacher.name} has been successfully booked.\n\nThank you for using our platform!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Email error:", error);
      else console.log("Email sent: " + info.response);
    });

    res.status(200).json({
      message: "Session successfully booked. Credits updated, email sent.",
    });
  } catch (error) {
    console.error("Error booking session:", error);
    res.status(500).json({ message: "An error occurred while booking the session" });
  }
};



const updateProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const updates = req.body;

    const updatedUser = await User.findOneAndUpdate({ email }, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


module.exports = { create ,updateProfile,searchBySkill,getAllUsers,getUserById,bookSession};
