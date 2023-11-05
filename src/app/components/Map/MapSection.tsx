"use client";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import * as React from "react";
import Info from "../../components/info";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar";
import { useMapApiLoader } from "@/contexts/MapApiLoaderContext";
import anime from "animejs";

interface InfoData {
	beach: string;
	probability: number;
	waveHeight: number;
	waveDirection: number;
	wavePeriod: number,
	windSpeed: number;
	windDirection: number;
	temp: number;
}

const dummy: InfoData = {
	beach: "PT. Pleseant",
	probability: 12,
	waveHeight: 3,
	waveDirection: 1,
	wavePeriod: 2,
	windSpeed: 1,
	windDirection: 2,
	temp: 5,
};

export default function MapSection() {
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

	const isFirst = useRef(0);
	const mountedNum = useRef(0);
	const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
		undefined
	);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getData(position.lat, position.lon);

		if (mountedNum.current < 2) {
			mountedNum.current += 1;
			return;
		}

		anime({
			targets: "#searchBar",
			translateX: -(window.innerWidth / 10),
			translateY: -(window.innerHeight / 2) + 80,
			duration: 3000,
		});
	}, [position]);

	const [infoData, setInfoData] = useState<InfoData>(dummy);

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading Maps</div>;

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	function kToF(kelvin: number): number {
		return (kelvin - 273.15) * (9 / 5) + 32;
	}

	async function getData(lat: number, long: number) {
		if (isFirst.current < 3) {
			isFirst.current += 1;
		}
		const response = await fetch(
			`http://localhost:3000/tideData?lat=${lat}&long=${long}`
		);
		console.log(response)
		const data = await response.json();
		const res = data.riptideData;
		res.beach = places[0].name.slice(0, -1);

		setInfoData(res);
	}

	type Place = {
		name: string;
		lat: number;
		lon: number;
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleOpen = () => {setSelectedPlace(places[0]); setOpen(true);};
	const handleClose = () => {setSelectedPlace(undefined); setOpen(false);};

	return (
		<div className="w-full h-full">
			<div
				id="searchBar"
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
			>
				<SearchBar
					API="AIzaSyC08j2W_ZgnXQD_8agkZSI6roDQKiMZu-A"
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
								{isFirst.current > 2 && places.map((place) => (
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
														probability={Number(
															infoData.probability.toFixed(
																3
															)
														)}
														waveHeight={Number(
															infoData.waveHeight.toFixed(
																3
															)
														)}
														waveDirection={Number(
															infoData.waveDirection.toFixed(
																3
															)
														)}
														wavePeriod={Number(
															infoData.wavePeriod.toFixed(
																3
															)
														)}
														windSpeed={Number(
															infoData.windSpeed.toFixed(
																3
															)
														)}
														windDirection={Number(
															infoData.windDirection.toFixed(
																3
															)
														)}
														temp={Number(
															kToF(
																infoData.temp
															).toFixed(3)
														)}
		
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
