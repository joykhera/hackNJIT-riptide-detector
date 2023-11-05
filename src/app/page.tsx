"use client";

import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import MapSection from "./components/Map/MapSection";
import { MapApiLoaderProvider } from "@/contexts/MapApiLoaderContext";

export default function Home() {
	return (
		<main>
			<MapApiLoaderProvider apiKey="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI">
				<div className="h-20 bg-header-blue">
					<Navbar />
					<SearchBar />
				</div>
				<div className="w-full h-screen bg-gray-200">
					<div className="w-full h-full pt-6">
						<MapSection
							API="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI"
							// API={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
						/>
					</div>
				</div>
			</MapApiLoaderProvider>
		</main>
	);
}

// import Navbar from "./components/navbar";
// import SearchBar from "./components/SearchBar";
// import MapSection from "./components/Map/MapSection";
// import { Libraries, useLoadScript } from '@react-google-maps/api';

// function App() {
//     const apiKey = "AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI"; // Replace with your actual API key
//     const libraries: Libraries = ["places"]; // Adjust libraries as needed

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: apiKey,
//         libraries,
//     });

//     if (loadError) return <div>Error loading maps</div>;
//     if (!isLoaded) return <div>Loading Maps</div>;

//     return (
//         <main>
//             <div className="h-20 bg-header-blue">
//                 <Navbar />
//                 {/* <SearchBar /> */}
//             </div>
//             <div className="w-full h-screen bg-gray-200">
//                 <div className="w-full h-full pt-6">
//                     <MapSection
// 						API={apiKey}
// 					/>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default App;
