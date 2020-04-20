import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import axios from 'axios';
import { commafy, friendlyDate } from '../utils/util';
import Grid from '../components/Grid';

class MapLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allData: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('https://corona.lmao.ninja/v2/countries')
            .then(response => {
                this.setState({
                    data: response.data,
                    isLoaded: true
                })
            })
            .catch(err => {
                console.log('error', err);
            });
    }

    mapData() {
        let { isLoaded, data } = this.state;
        if (!isLoaded) {
            return (<div>Loading...</div>)
        }
        if(data.length !== 0) {
            return data.map((item, index) => {
                return <Marker position={[item.countryInfo.lat, item.countryInfo.long]} key={index}>
                            <Popup>
                                {item.countryInfo.iso2} | {item.country} <br />
                                Confirmed: {item.cases ? commafy(item.cases) : '-'} <br />
                                Active: {item.active ? commafy(item.active) : '-'} <br />
                                Deaths: {item.deaths ? commafy(item.deaths) : '-'} <br />
                                Recovered: {item.recovered ? commafy(item.recovered) : '-'} <br />
                                Last updated: {item.updated ? friendlyDate(item.updated) : '-'} <br />
                            </Popup>
                            <Tooltip direction="bottom">{item.country}</Tooltip>
                        </Marker>
            })
        }
        return <div>No Data!</div>
    }

    render() {
        return (
            <div style={{ height: '400px', border: '3px solid black' }}>
                <Map center={[42.144920, 24.750320]} style={{ width: '100%', height: '100%' }} zoom={6}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.mapData()}
                </Map>
                <Grid />
            </div>
        )
    }
}

export default MapLayout