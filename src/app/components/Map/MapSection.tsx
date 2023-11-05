"use client";

import {
	GoogleMap,
	InfoWindowF,
	MarkerF,
	useJsApiLoader,
} from "@react-google-maps/api";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
export const DEFAULT_DISTANCE_IN_KM = "100";

const configureSchema = Yup.object().shape({
	city: Yup.string().required("Required"),
});

const containerStyle = {
	width: "100%",
	height: "400px",
};

async function getLatLonForCity(city: string) {
	console.log(process.env);
	const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
		city + ", USA"
	)}&key=API_KEY`;
	const geocodeResponse = await fetch(geocodeUrl);
	const geocodeData = await geocodeResponse.json();
	const { lat, lng } = geocodeData.results[0].geometry.location;
	return { lon: lng, lat };
}

export type Place = {
	name: string;
	latitude: number;
	longitude: number;
};

export default function DashboardPage() {
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
		googleMapsApiKey: "API_KEY",
	});

	const [position, setPosition] = useState({
		lat: places[0].latitude,
		lon: places[0].longitude,
	});

	const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
		places[0]
	);

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
					setPlaces(newPlace);
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
					{places.map((place) => (
						<MarkerF
							key={`${place.name}-${place.latitude}-${place.longitude}`}
							onClick={() => {
								place === selectedPlace
									? setSelectedPlace(undefined)
									: setSelectedPlace(place);
							}}
							position={{
								lat: place.latitude,
								lng: place.longitude,
							}}
						/>
					))}
					{selectedPlace && (
						<InfoWindowF
							position={{
								lat: selectedPlace.latitude,
								lng: selectedPlace.longitude,
							}}
							zIndex={1}
							options={{
								pixelOffset: new google.maps.Size(0, -40),
							}}
							onCloseClick={() => setSelectedPlace(undefined)}
						>
							<div>
								<h3>{selectedPlace.name}</h3>
							</div>
						</InfoWindowF>
					)}
				</GoogleMap>
			)}
		</div>
	);
}
