import * as React from 'react';
import '../scss/Map.scss'
import {Map as LeafletMap,TileLayer} from "react-leaflet";
import {showDataOnMap} from "../utils/utils";


const Mapa = ({countries,center,zoom,casesType}) => {
    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom} >
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org.copyright">OpenStreetMap</a> contributors'/>
               {showDataOnMap(countries,casesType)}
           </LeafletMap>
        </div>
    );
};

export default Mapa