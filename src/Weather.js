/**
 * Created by ajcal on 15/01/2017.
 */

import React, { Component} from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timezone: null,
            summary: null,
            temp_max: null,
            temp_min: null,
            temp: null
        }

        this.updateWeather();
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     10000
        // );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            weather: this.updateWeather()
        });
    }

    getUrl() {
        var api_key = "65e2aabda502b2a4ae4793adcee989ad";
        var lat = "51.4924920";
        var lon = "-0.2111690";
        var units = "uk2"
        var url = "https://api.darksky.net/forecast/"
            + api_key + "/"
            + lat + ","
            + lon
            + "?units=" + units;

        return url;
    }

    // API call to Dark Sky and update the state
    updateWeather() {
        fetchJsonp(this.getUrl(), {mode: 'no-cors'})
            .then(res => {
                console.log("Success");
                return res.json();
            })
            .then(res => {
                var weather = res;
                this.setState({
                    timezone: weather.timezone,
                    summary: weather.hourly.summary,
                    temp_max: weather.daily.data[0].apparentTemperatureMax,
                    temp_min: weather.daily.data[0].apparentTemperatureMin,
                    temp: weather.currently.apparentTemperature,
                });
            })
            .catch(res => {
                console.log("Error: " + res);
            })
    }

    render () {
        return (
            <div className="weather">
                <div className="weather-summary">
                    {/*<p>{this.state.timezone}</p>*/}
                    {/*<p>{this.state.summary}</p>*/}
                    <p></p>
                </div>
                <div className="temperature">
                    {/*<h4>Current temp: {this.state.temp}</h4>*/}
                    {/*<span>Max:{this.state.temp_max} | </span>*/}
                    {/*<span>Min: {this.state.temp_min}</span>*/}
                </div>
            </div>
        );
    }
}

export default Weather;
