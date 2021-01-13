import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

function Map() {
    const position = [34.80746, -40.4796]
    const zoom = 3;

    return (
        <div className="map">
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               
            </MapContainer>
        </div>
        
    )
}

export default Map
