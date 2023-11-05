import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import MapSection from "./components/Map/MapSection";


export default function Home() {
	return (
		<main>
			<div className="h-20 bg-header-blue">
				<Navbar />
				{/* <SearchBar /> */}
			</div>
			<div className="w-full h-screen bg-white-200">
				<div className="w-full h-full pt-6">
					<MapSection
						API="AIzaSyALbJ2JND15H6HNWdhUTpW348JUQwQ3uDI"
						// API={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
					/>
				</div>
			</div>
		</main>
	);
}
