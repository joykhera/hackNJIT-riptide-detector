"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";

const About = () => {
  return (
    <div className="">
      <div className="h-20 bg-header-blue">
        <Navbar />
      </div>

      <div className="mt-10 flex justify-center items-center">
        <div className="col-span-1 ml-5 mr-5 relative group w-5/6">
          <div className="h-63 bg-white-100 rounded-lg overflow-hidden justify-center items-center h-full object-cover transform transition duration-500 hover:scale-100">
            <section
              className="p-9 bg-cover bg-center py-16 text-white relative"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/1482193/pexels-photo-1482193.jpeg?cs=srgb&dl=sailboat-sailing-on-water-near-island-1482193.jpg&fm=jpg")',
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="container mx-auto relative z-10">
                <div className="text-center p-2">
                  <h2 className="mt-2 text-[40px] font-bold transition-transform transform translate-y-0 group-hover:translate-y-[-25%] duration-500">
                    Our Mission
                  </h2>
                  <div className="">
                    <Image
                      src="/arrow.png"
                      alt="Mission Icon"
                      width={20}
                      height={20}
                      className="mt-6 w-12 h-12 mx-auto opacity-100 group-hover:opacity-5 transition-opacity duration-1000 transition-transform transform translate-y-0 group-hover:translate-y-[-200%] duration-700"
                    />
                  </div>
                  <p className="text-[10px] md:text-[2.2vh] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transition-transform transform translate-y-0 group-hover:translate-y-[-65%]">
                    Riptides are a significant threat to beachgoers, surfers,
                    and boaters. Our mission is to make our shores safer through
                    cutting-edge technology and data-driven solutions. A website
                    dedicated to tracking riptides plays a pivotal role in
                    keeping you informed, protecting lives, and promoting beach
                    safety.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-10 text-center bg-gray-100 p-4">
        <div className="container mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
            {/* Darkened background for the first column */}
            <div
              className="absolute inset-0 transform transition duration-500 hover:scale-105"
              style={{
                backgroundColor: "#b3e0ff80", // Hex color with 80% opacity (adjust the opacity as needed)
              }}
            />
            {/* Content for the first column */}
            <div className="animate-pulse">
              <h1 className="text-[30px] font-bold mb-2">100+</h1>
              <p className="text-gray-700">number of deaths per year</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
            {/* Darkened background for the second column */}
            <div
              className="absolute inset-0 transform transition duration-500 hover:scale-105"
              style={{
                backgroundColor: "#4db8ff80", // Hex color with 80% opacity (adjust the opacity as needed)
              }}
            />
            {/* Content for the second column */}
            <div className="animate-pulse">
              <h1 className="text-[30px] font-bold mb-2">5000+</h1>
              <p className="text-gray-700">total number of riptides per year</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
            {/* Darkened background for the third column */}
            <div
              className="absolute inset-0 transform transition duration-500 hover:scale-105"
              style={{
                backgroundColor: "#b3e0ff80", // Hex color with 80% opacity (adjust the opacity as needed)
              }}
            />
            {/* Content for the third column */}
            <div className="animate-pulse">
              <h1 className="text-[30px] font-bold mb-2">500+</h1>
              <p className="text-gray-700">total number of injuries</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
            {/* Darkened background for the fourth column */}
            <div
              className="absolute inset-0 transform transition duration-500 hover:scale-105"
              style={{
                backgroundColor: "#4db8ff80", // Hex color with 80% opacity (adjust the opacity as needed)
              }}
            />
            {/* Content for the fourth column */}
            <div className="animate-pulse">
              <h1 className="text-[30px] font-bold mb-2">80%</h1>
            </div>
            <p className="text-gray-700">
              of lifeguard saves are due to riptides
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
