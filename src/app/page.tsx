import Image from "next/image";
import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";

export default function Home() {
	return (
		<main>
			<div className="h-20 bg-header-blue">
        <Navbar />
        <SearchBar />
			</div>
			<div className="w-full h-screen bg-gray-200">
        <div className="w-full h-full pt-6"></div>
			</div>
		</main>
	);
}
