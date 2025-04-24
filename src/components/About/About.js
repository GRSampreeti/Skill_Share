import React from 'react';
import './About.css'; // Make sure to import the CSS file

const About = () => {
    return (
        <div className="about-container">
            <h1>Welcome to our Learning Platform!</h1>
            <p>
                This website connects students with experienced teachers, enabling personalized learning and seamless session bookings.
            </p>
            <h2>🌟 Key Features:</h2>
            <ul className="features-list">
                <li><strong>Explore Teacher Profiles:</strong> Browse through a wide range of teacher profiles with detailed information on their skills and courses.</li>
                <li><strong>Book Sessions:</strong> Easily book learning sessions with the teacher of your choice, based on their available courses.</li>
                <li><strong>Personalized Experience:</strong> Receive tailored recommendations based on your preferences and learning goals.</li>
                <li><strong>Interactive UI:</strong> A user-friendly interface built with modern technologies for an intuitive experience.</li>
            </ul>
            <h2>🚀 Our Mission:</h2>
            <p>
                We aim to create a bridge between students and skilled teachers, making learning accessible and engaging for everyone. Whether you want to enhance your skills or explore a new field, we are here to help you achieve your learning goals.
            </p>
        </div>
    );
}

export default About;
