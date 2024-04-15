import { Button, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import osm from './osmprovider';
import './Map.css'; // Make sure this import is correct
import 'leaflet/dist/leaflet.css'; // Make sure this import is correct
import L from 'leaflet';
import useGeoLocation from './useGeoLocation';

const markerIcon = new L.Icon({
    iconUrl: require('./marker.jpg'),
    iconSize: [20, 20],
    iconAnchor: [17, 20],
    popupAnchor: [3, -46],
});

function MapComp() {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 5;
    const mapRef = useRef();

    const location = useGeoLocation();

    const showMyLocation = () => {
        if (location.loaded && !location.error && mapRef.current) {
            const { leafletElement } = mapRef.current;
            if (leafletElement) {
                leafletElement.flyTo([location.coordinate.lat, location.coordinate.lng], ZOOM_LEVEL, { animate: true });
            } else {
                console.error('Leaflet element is not defined.');
            }
        } else if (location.error) {
            console.error('Location error:', location.error);
            alert(location.error.message || 'Unknown error occurred');
        } else {
            console.error('Location not loaded.');
            alert('Location not loaded');
        }
    }
    

    useEffect(() => {
        showMyLocation(); // Trigger the function after the map is initialized
    }, []);

    return (
        <Container sx={{ height: "50vh", width: "100%" }}>
            <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                style={{ height: "50vh", width: "100%" }} // Set map container dimensions
            >
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                {location.loaded && !location.error && (
                    <Marker position={[location.coordinate.lat, location.coordinate.lng]} icon={markerIcon}>
                        <Popup>
                            <p></p>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            <Button onClick={showMyLocation}>Click Me</Button>
        </Container>
    );
}

export default MapComp;
