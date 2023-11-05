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
// import dotenv from 'dotenv'
// dotenv.config({ path: '../../.env' })
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

export default function DashboardPage({ API }: Data) {
	const configureSchema = Yup.object().shape({
		city: Yup.string().required("Required"),
	});

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

	const [places, setPlaces] = useState<Place[]>([
		{
			name: "Burger City",
			latitude: 40.7,
			longitude: -74.0,
		},
	]);
	const cityRef = useRef(undefined);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: API,
	});
	const [isFirst, setFirst] = useState(true);

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

	const [position, setPosition] = useState({
		lat: places[0].latitude,
		lon: places[0].longitude,
	});

	const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
		places[0]
	);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className="flex flex-col gap-4">
			<Formik
				initialValues={{
					city: "New York City",
				}}
				validationSchema={configureSchema}
				onSubmit={async (formData) => {
					const { lat, lon } = await getLatLonForCity(formData.city);
					setPosition({ lat, lon });
					const newPlace = [
						{
							name: formData.city,
							latitude: lat,
							longitude: lon,
						},
					];
					if (isFirst) {
						setFirst(false);
					}
					setPlaces(newPlace);
					setSelectedPlace(undefined);
					await timeout(1000);
					setSelectedPlace(newPlace[0]);
				}}
			>
				{({ errors }) => (
					<Form className="w-full">
						<div className="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 md:grid-cols-3">
							<div>
								<label htmlFor="city">Search by City</label>
								<Field
									innerRef={cityRef}
									className="input"
									placeholder="New York City, Frankfurt, etc"
									id="city"
									name="city"
									type="text"
								/>
							</div>
							<button
								className="button-inverse h-12 w-full self-end disabled:pointer-events-none disabled:bg-gray"
								type="submit"
							>
								Search
							</button>
						</div>
					</Form>
				)}
			</Formik>

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
