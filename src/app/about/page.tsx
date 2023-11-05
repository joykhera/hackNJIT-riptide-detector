import React from "react";
import Navbar from "../components/navbar";
const About = () => {
	return (
		<div className="">
			<div className="h-20 bg-header-blue">
				<Navbar />
			</div>
			<h1 className="text-3xl font-semibold mb-4">About Us</h1>
			<p className="text-lg mb-4">
				Welcome to our website! We are dedicated to providing vital
				information about riptides and their potential dangers to
				beachgoers and water enthusiasts.
			</p>
			<p className="text-lg mb-4">
				Our mission is to increase awareness about riptides and to help
				save lives by providing accurate and up-to-date data on areas
				prone to riptides. We believe that by sharing this knowledge, we
				can contribute to safer and more informed decisions when
				enjoying the ocean.
			</p>
			<p className="text-lg mb-4">
				Whether you are a beachgoer, a surfer, a swimmer, or simply
				someone who loves the ocean, our platform is here to assist you.
				By using our website, you can easily access information about
				riptide-prone areas, making it easier to plan your beach trips
				and water-related activities.
			</p>
			<p className="text-lg mb-4">
				Our team of dedicated experts and enthusiasts are constantly
				working to improve and expand our platform. We aim to provide
				the most accurate and reliable data to keep you safe and
				informed during your time at the beach.
			</p>
			<p className="text-lg mb-4">
				Thank you for choosing us as your source of riptide information.
				We hope you have a safe and enjoyable experience at the beach,
				and were here to help you every step of the way.
			</p>
		</div>
	);
};

export default About;
