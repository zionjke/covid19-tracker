import * as React from 'react';
import '../scss/Map.scss'
import {Map as LeafletMap,TileLayer} from "react-leaflet";


const Mapa = ({countries,center,zoom}) => {
    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom} >
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org.copyright">OpenStreetMap</a> contributors'/>
           </LeafletMap>
        </div>
    );
};

export default Mapa