import React, { Component } from 'react';
import axios from 'axios';
import { commafy, friendlyDate } from '../utils/util';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        axios.get('https://corona.lmao.ninja/v2/all')
            .then(response => {
                this.setState({
                    allData: response.data,
                    isLoaded: true
                })
            })
    }

    render() {
        const { allData } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            <h3>{allData.cases ? commafy(allData.cases) : '-'}</h3>
                            <p>Total cases</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{allData.deaths ? commafy(allData.deaths) : '-'}</h3>
                            <p>Total Deaths</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{allData.active ? commafy(allData.active) : '-'}</h3>
                            <p>Active</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{allData.recovered ? commafy(allData.recovered) : '-'}</h3>
                            <p>Recovered</p>
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f1f1', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                    <h3> Last Updated: {allData.updated ? friendlyDate(allData.updated) : '-'}</h3>
                </div>
            </div>
        )
    }
}

export default Grid;