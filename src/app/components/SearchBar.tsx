"use client"
import React from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { useMapApiLoader } from '@/contexts/MapApiLoaderContext';

// const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface Data {
	API: string;
}

function SearchBar() {
    const libraries: Libraries = ["places"];
    const { isLoaded, loadError } = useMapApiLoader();

    const handleSearch = () => {
        const addressInput = (document.getElementById('autocomplete') as HTMLInputElement)?.value;
        console.log("searching for: ", addressInput);
    }

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div className="flex items-center justify-center mt-4">
          <div className="relative w-64">
            <input
              className="w-full px-4 py-2 text-black border rounded-lg"
              id="autocomplete"
              placeholder="Enter a location"
              type="text"
            />
          </div>
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
      );      
}

export default SearchBar;
