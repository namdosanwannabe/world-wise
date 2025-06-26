import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import flagemojiToPNG from '../utils/emojiToPng';
import { useUrlPosition } from '../hooks/useUrlPosition';

const Map = () => {
    const { cities } = useCities();
    const [mapLat, mapLng] = useUrlPosition();

    const [mapPosition, setMapPosition] = useState([14.677759365613536, 120.53993225097658]);
    const {
        isLoading: isLoadingPositon,
        position: geolocationPosition,
        getPosition
    } = useGeolocation();


    useEffect(() => {
        if (mapLat && mapLng)
            setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type='position' onClick={getPosition}>
                {isLoadingPositon ? 'Loading...' : 'Use your position'}
            </Button>}
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities?.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.lat, city.lng]}>
                        <Popup>
                            <span>{flagemojiToPNG(city.emoji)}</span>
                            <span>{city.city_name}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DeteClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DeteClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    })
}

export default Map