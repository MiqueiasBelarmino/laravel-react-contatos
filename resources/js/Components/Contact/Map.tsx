import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -3.745,
    lng: -74.35,
};

interface MapProps {
    positions: { lat: number; lng: number; }[];
    center?: { lat: number; lng: number; };
    zoom?: number;
}
export default function Map({
    positions,
    center = {
        lat: -3.745,
        lng: -74.35,
    },
    zoom = 2
}: MapProps) {
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={positions[0]??center}
                zoom={zoom}
            >
                {
                    positions.map((position) => (
                        <Marker key={position.lat} position={position} />
                    ))
                }
            </GoogleMap>
        </LoadScript>
    );
};
