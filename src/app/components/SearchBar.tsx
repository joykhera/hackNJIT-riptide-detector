"use client";
import React from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { useMapApiLoader } from "@/contexts/MapApiLoaderContext";

// const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
type Place = {
	name: string;
	lat: number;
	lon: number;
};

interface Data {
	API: string;
	position: {
		lat: number;
		lon: number;
	};
	setPosition: (position: { lat: number; lon: number }) => void;
	places: {
		name: string;
		lat: number;
		lon: number;
	};
	setPlaces: (places: Place[]) => void;
	setFirstUsed: (x: boolean) => void;
}

function SearchBar({ API, position, setPosition, places, setPlaces, setFirstUsed }: Data) {
	const { isLoaded, loadError } = useMapApiLoader();

	const handleSearch = () => {
		const addressInput = (
			document.getElementById("autocomplete") as HTMLInputElement
		)?.value;

		const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			addressInput
		)}&key=AIzaSyC08j2W_ZgnXQD_8agkZSI6roDQKiMZu-A`;
		fetch(geocodingUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "OK" && data.results.length > 0) {
					const location = data.results[0].geometry.location;
					const latitude = location.lat - 0.1;
					const longitude = location.lng;
					console.log(
						`Latitude: ${latitude}, Longitude: ${longitude}`
					);
					setPosition({ lat: latitude, lon: longitude });
					setFirstUsed(true);
					setPlaces([
						{
							name: addressInput,
							lat: latitude,
							lon: longitude,
						},
					]);
				} else {
					console.error("Geocoding failed for the given address.");
				}
			})
			.catch((error) => {
				console.error("Error while geocoding:", error);
			});
	};

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";

	return (
		<div className="flex items-center justify-center px-3 py-2 mt-2 bg-header-blue">
			{/* <div className="relative w-64"> */}
			<Autocomplete className="relative w-64">
				<input
					className="w-full px-4 py-2 text-black border rounded-lg"
					id="autocomplete"
					placeholder="Enter a location"
					type="text"
				/>
			</Autocomplete>
			{/* </div> */}
			<button
				onClick={handleSearch}
				className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
			>
				Search
			</button>
		</div>
	);
}

export default SearchBar;
