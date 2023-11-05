import React from "react";
import Alert from "@mui/material/Alert";

interface Data {
	beach: string;
	probability: number;
	windspeed: number;
	waveheight: number;
	temp: number;
	cape: number;
	rain: number;
}

const temp: Data = {
	beach: "PT. Pleseant",
	probability: 12,
	windspeed: 1,
	waveheight: 3,
	temp: 5,
	cape: 2,
	rain: 1,
};

function info({
	beach,
	probability,
	windspeed,
	waveheight,
	temp,
	cape,
	rain,
}: Data) {
	const numRows = 6;
	const numCols = 2;

	const tableData = [
		["Riptide (%)", probability],
		["Wind Speed (MpH)", windspeed],
		["Wave Height (M)", waveheight],
		["Temperature (F)", temp],
		["Cape (J/Kg)", cape],
		["Rain", rain],
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
