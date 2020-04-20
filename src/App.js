import React from 'react';
//import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
//import { Icon } from 'leaflet';
import MapLayout  from './components/MapLayout';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <MapLayout />
    </div>
  );
}

export default App;
