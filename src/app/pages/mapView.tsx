import React from "react";
import Info from "../components/info";

interface Data {
	beach: string;
	probability: number;
	low: number;
	high: number;
}

function MapView() {
	const temp: Data = {
		beach: "PT. Pleseant",
		probability: 12,
		low: 1,
		high: 3,
	};
	return (
		<Info
			beach={temp.beach}
			probability={temp.probability}
			low={temp.low}
			high={temp.high}
		/>
	);
}

export default MapView;
