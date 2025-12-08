import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view changes
const MapViewController = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, {
                duration: 1.5
            });
        }
    }, [center, zoom, map]);

    return null;
};

const CoverageMap = () => {
    const [serviceAreas, setServiceAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [mapCenter, setMapCenter] = useState([23.8103, 90.4125]);
    const [mapZoom, setMapZoom] = useState(7);

    useEffect(() => {
        fetch('/serviceArea.json')
            .then(response => response.json())
            .then(data => {
                setServiceAreas(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading service areas:', error);
                setLoading(false);
            });
    }, []);

    // Get unique regions
    const regions = ['all', ...new Set(serviceAreas.map(area => area.region))];

    // Filter areas based on selected region
    const filteredAreas = selectedRegion === 'all'
        ? serviceAreas
        : serviceAreas.filter(area => area.region === selectedRegion);

    // Handle district button click
    const handleDistrictClick = (latitude, longitude) => {
        setMapCenter([latitude, longitude]);
        setMapZoom(12);
    };

    // Handle region change
    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        if (region !== 'all' && filteredAreas.length > 0) {
            const firstArea = serviceAreas.find(area => area.region === region);
            if (firstArea) {
                setMapCenter([firstArea.latitude, firstArea.longitude]);
                setMapZoom(9);
            }
        } else {
            setMapCenter([23.8103, 90.4125]);
            setMapZoom(7);
        }
    };

    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">Our Coverage</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12">We deliver books to readers across the globe. Check if your city is on the map!</p>

                {/* Region Filter */}
                <div className="mb-6 flex justify-center">
                    <div className="flex flex-wrap gap-2">
                        {regions.map((region, index) => (
                            <button
                                key={index}
                                onClick={() => handleRegionChange(region)}
                                className={`btn btn-sm ${selectedRegion === region ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {region === 'all' ? 'All Regions' : region}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-[500px]">
                        <div className="text-lg">Loading map...</div>
                    </div>
                ) : (
                    <div className="rounded-3xl overflow-hidden shadow-inner border-4 border-white">
                        <MapContainer
                            center={[23.8103, 90.4125]}
                            zoom={7}
                            scrollWheelZoom={false}
                            style={{ height: '500px', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapViewController center={mapCenter} zoom={mapZoom} />
                            {filteredAreas.map((area, index) => (
                                <Marker
                                    key={index}
                                    position={[area.latitude, area.longitude]}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <h3 className="font-bold text-lg">{area.city}</h3>
                                            <p className="text-sm text-gray-600">{area.district}, {area.region}</p>
                                            <p className="text-xs mt-2"><strong>Covered Areas:</strong></p>
                                            <p className="text-xs">{area.covered_area.join(', ')}</p>
                                            <p className="text-xs mt-2">
                                                <span className={`badge ${area.status === 'active' ? 'badge-success' : 'badge-warning'} badge-sm`}>
                                                    {area.status}
                                                </span>
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                )}

                {/* District Buttons */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-center mb-4">Available Districts</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {filteredAreas.map((area, index) => (
                            <button
                                key={index}
                                onClick={() => handleDistrictClick(area.latitude, area.longitude)}
                                className="badge badge-outline p-3 cursor-pointer hover:badge-primary transition-colors"
                            >
                                {area.city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoverageMap;