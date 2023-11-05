import React from "react";
import Alert from "@mui/material/Alert";

interface Data {
	beach: string;
	probability: number;
	waveHeight: number;
	waveDirection: number;
	wavePeriod: number,
	windSpeed: number;
	windDirection: number;
	temp: number;
}

const temp: Data = {
	beach: "PT. Pleseant",
	probability: 12,
	waveHeight: 3,
	waveDirection: 1,
	wavePeriod: 2,
	windSpeed: 1,
	windDirection: 2,
	temp: 5,
};

function info({
	beach,
	probability,
	waveHeight,
	waveDirection,
	wavePeriod,
	windSpeed,
	windDirection,
	temp
}: Data) {
	const numRows = 6;
	const numCols = 2;

	const tableData = [
		["Riptide (%)", probability],
		["Wave Height (M)", waveHeight],
		["Wave Direction", waveDirection],
		["Wave Period", wavePeriod],
		["Wind Speed (mph)", windSpeed],
		["Wind Direction", windDirection],
		["Temperature (F)", temp],
	];
	const isRiptide = probability > 50;

	return (
		<>
			<div className="">
				{beach}
				<div className="mt-3 h-1 bg-gray-500 w-full"></div>
				<div className="font-bold mt-5">Information for today</div>
			</div>
			<div className="container mx-auto mb-3">
				<table className="table-auto border border-gray-300 w-full">
					<tbody>
						{tableData.map((rowData, rowIndex) => (
							<tr key={rowIndex}>
								{rowData.map((cell, colIndex) => (
									<td
										key={colIndex}
										className="border border-gray-300 p-2"
									>
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isRiptide ? (
				<Alert icon={false} severity="error">
					There is a high chance of riptides today!
				</Alert>
			) : (
				<Alert icon={false} severity="success">
					There is a low chance of riptides today!
				</Alert>
			)}
		</>
	);
}

export default info;
