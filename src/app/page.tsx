"use client";

import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import MapSection from "./components/Map/MapSection";
import { MapApiLoaderProvider } from "@/contexts/MapApiLoaderContext";

export default function Home() {
	return (
		<main>
			<div className="flex flex-col h-screen overflow-hidden">
				<MapApiLoaderProvider apiKey="AIzaSyC08j2W_ZgnXQD_8agkZSI6roDQKiMZu-A">
					<div className="h-20 bg-header-blue">
						<Navbar />
						{/* <SearchBar API="AIzaSyC08j2W_ZgnXQD_8agkZSI6roDQKiMZu
AIzaSyDtFXYEjHABeVmYrw2VAkOSJSICDATtCWI
" /> */}
					</div>
					<div className="flex flex-grow w-full bg-gray-200">
						<MapSection
							API="AIzaSyC08j2W_ZgnXQD_8agkZSI6roDQKiMZu-A"
							// API={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
						/>
					</div>
				</MapApiLoaderProvider>
			</div>
		</main>
	);
}
