import MapSection from './components/Map/MapSection';

function page() {

    return (
        <div className="App">
          <MapSection API={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}/>
        </div>
    );
}

export default page;