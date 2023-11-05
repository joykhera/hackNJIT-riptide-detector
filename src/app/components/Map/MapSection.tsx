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

import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar";
import { useMapApiLoader } from "@/contexts/MapApiLoaderContext";
import anime from "animejs";

export const DEFAULT_DISTANCE_IN_KM = "100";

interface Data {
	API: string;
}

interface Riptide {
	riptideData: InfoData;
}
interface InfoData {
	beach: string;
	probability: number;
	windSpeed: number;
	waveHeight: number;
	temp: number;
	cape: number;
	ptype: number;
}

const temp: InfoData = {
	beach: "PT. Pleseant",
	probability: 12,
	windSpeed: 1,
	waveHeight: 3,
	temp: 5,
	cape: 2,
	ptype: 1,
};

export default function MapSection({ API }: { API: string }) {
	const { isLoaded, loadError } = useMapApiLoader();
	const [places, setPlaces] = useState<Place[]>([
		{
			name: "Hoboken",
			lat: 40.7,
			lon: -74.0,
		},
	]);
	const [position, setPosition] = useState({
		lat: places[0].lat,
		lon: places[0].lon,
	});

	const [isFirst, setFirst] = useState(true);
	const mountedNum = useRef(0);
	const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
		places[0]
	);
	const [open, setOpen] = useState(false);
	const cityRef = useRef(undefined);

	useEffect(() => {
		if (mountedNum.current < 2) {
			mountedNum.current += 1;
			return;
		}
		console.log(window.innerWidth, window.innerHeight);
		console.log(document.getElementById("searchBar")?.getBoundingClientRect());
		anime({
			targets: '#searchBar',
			translateX: -(window.innerWidth / 10),
			translateY: -(window.innerHeight / 2) + 80,
			duration: 3000,
		});
		console.log(document.getElementById("searchBar")?.getBoundingClientRect());
	}, [position,]);

	const [infoData, setInfoData] = useState<InfoData>(temp);

	useEffect(() => {
		getData(position.lat, position.lon);
	}, [position]);

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading Maps</div>;

	const containerStyle = {
		width: "100%",
		height: "100%",
		// position: "absolute"
	};

	async function getData(lat: number, long: number) {
		const response = await fetch(
			`http://localhost:3000/tideData?lat=${lat}&long=${long}`
		);
		const data = await response.json();
		const res = data.riptideData;

		console.log(res);
		setInfoData(res);
		// console.log(infoData);
	}

	type Place = {
		name: string;
		lat: number;
		lon: number;
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

	return (
		<div className="w-full h-full">
				<div id='searchBar' className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}>
				<SearchBar
					API="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI"
					position={position}
					setPosition={setPosition}
					places={places[0]}
					setPlaces={setPlaces}
				/>
			</div>
			<div className="flex flex-col gap-4 w-full h-full">
				{isLoaded && (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={{ lat: position.lat, lng: position.lon }}
						zoom={13}
					>
						{
							<div>
								{places.map((place) => (
									<MarkerF
										key={`${place.name}-${place.lat}-${place.lon}`}
										onClick={handleOpen}
										position={{
											lat: place.lat,
											lng: place.lon,
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
												lat: selectedPlace.lat,
												lng: selectedPlace.lon,
											}}
											zIndex={1}
											options={{
												pixelOffset:
													new google.maps.Size(
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
														beach={infoData.beach}
														probability={
															infoData.probability
														}
														windspeed={
															infoData.windSpeed
														}
														waveheight={
															infoData.waveHeight
														}
														temp={infoData.temp}
														cape={infoData.cape}
														rain={infoData.ptype}
													/>
												</Box>
											</Modal>
										</div>
									</>
								)}
							</div>
						}
					</GoogleMap>
				)}
			</div>
		</div>
	);
}
