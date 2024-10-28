import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

interface MapProps {
    positions: { lat: number; lng: number; }[];
    center?: { lat: number; lng:number; };
    zoom?: number;
}

export default function Map({ positions, center, zoom = 2 }: MapProps) {
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
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
