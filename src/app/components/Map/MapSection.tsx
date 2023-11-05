"use client";

import {
	GoogleMap,
	InfoWindowF,
	MarkerF,
	useJsApiLoader,
} from "@react-google-maps/api";
import * as React from "react";
import Info from "../../components/info";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar";
import { useMapApiLoader } from "@/contexts/MapApiLoaderContext";

export const DEFAULT_DISTANCE_IN_KM = "100";

interface Data {
	API: string;
}

interface InfoData {
	beach: string;
	probability: number;
	low: number;
	high: number;
}

const temp: InfoData = {
	beach: "PT. Pleseant",
	probability: 12,
	low: 1,
	high: 3,
};

export default function MapSection({API}: {API: string}) {
	const { isLoaded, loadError } = useMapApiLoader();
	const [places, setPlaces] = useState<Place[]>([
		{
			name: "Hoboken",
			latitude: 40.7,
			longitude: -74.0,
		},
	]);
	const [position, setPosition] = useState({
		lat: places[0].latitude,
		lon: places[0].longitude,
	});
	const [isFirst, setFirst] = useState(true);
	const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
		places[0]
	);
	const [open, setOpen] = useState(false);
	const cityRef = useRef(undefined);


	const configureSchema = Yup.object().shape({
		city: Yup.string().required("Required"),
	});

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading Maps</div>;

	const containerStyle = {
		width: "100%",
		height: "650px",
	};

	async function getLatLonForCity(city: string) {
		const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			city + ", USA"
		)}&key=${API}`;
		const geocodeResponse = await fetch(geocodeUrl);
		const geocodeData = await geocodeResponse.json();
		const { lat, lng } = geocodeData.results[0].geometry.location;
		return { lon: lng, lat };
	}

	type Place = {
		name: string;
		latitude: number;
		longitude: number;
	};

	function timeout(delay: number) {
		return new Promise((res) => setTimeout(res, delay));
	}

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	console.log(position);

	return (
		<div className="flex flex-col gap-4 mt-12">
			<SearchBar 
				API="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI"
				position={position}
				setPosition={setPosition}
			/>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{ lat: position.lat, lng: position.lon }}
					zoom={13}
				>
					{!isFirst && (
						<div>
							{places.map((place) => (
								<MarkerF
									key={`${place.name}-${place.latitude}-${place.longitude}`}
									onClick={handleOpen}
									position={{
										lat: place.latitude,
										lng: place.longitude,
									}}
									animation={
										window.google.maps.Animation.DROP
									}
								/>
							))}
							{selectedPlace && (
								<>
									<InfoWindowF
										position={{
											lat: selectedPlace.latitude,
											lng: selectedPlace.longitude,
										}}
										zIndex={1}
										options={{
											pixelOffset: new google.maps.Size(
												0,
												-40
											),
										}}
										onCloseClick={() =>
											setSelectedPlace(undefined)
										}
									>
										<div>
											<h3>{selectedPlace.name}</h3>
										</div>
									</InfoWindowF>
									<div className="">
										<Modal
											open={open}
											onClose={handleClose}
											aria-labelledby="modal-modal-title"
											aria-describedby="modal-modal-description"
										>
											<Box sx={style}>
												<Info
													beach={temp.beach}
													probability={
														temp.probability
													}
													low={temp.low}
													high={temp.high}
												/>
											</Box>
										</Modal>
									</div>
								</>
							)}
						</div>
					)}
				</GoogleMap>
			)}
		</div>
	);
}
