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

function MapComp({latitude, longitude}) {
    const [center, setCenter] = useState({ lat: latitude || 0, lng: longitude || 0 });
    const ZOOM_LEVEL = 5;
    const mapRef = useRef();

    const showMyLocation = () => {
        if (mapRef.current) {
            const { leafletElement } = mapRef.current;
            if (leafletElement) {
                leafletElement.flyTo([latitude, longitude], ZOOM_LEVEL, { animate: true });
            } else {
                console.error('Leaflet element is not defined.');
            }
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
                {latitude && longitude && ( // Check if latitude and longitude are not undefined
                    <Marker position={[latitude, longitude]} icon={markerIcon}>
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


