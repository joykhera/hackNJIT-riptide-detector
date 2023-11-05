import React from "react";

interface Data {
	beach: string;
	probability: number;
	low: number;
	high: number;
}

function info({ beach, probability, low, high }: Data) {
	return (
		<div className="bg-white p-4 shadow-md rounded-md w-1/2 h-60">here</div>
	);
}

export default info;
