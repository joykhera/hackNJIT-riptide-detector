"use client";

import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import MapSection from "./components/Map/MapSection";
import { MapApiLoaderProvider } from "@/contexts/MapApiLoaderContext";

export default function Home() {
	return (
    <main>
      <div className="flex flex-col h-screen overflow-hidden">
			<MapApiLoaderProvider apiKey="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI">
				<div className="h-20 bg-header-blue">
					<Navbar />
				</div>
				<div className="flex flex-grow w-full bg-gray-200">
					<MapSection />
				</div>
        </MapApiLoaderProvider>
      </div>
		</main>
	);
}