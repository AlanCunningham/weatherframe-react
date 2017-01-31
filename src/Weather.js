/**
 * Created by ajcal on 15/01/2017.
 */

import React, { Component} from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import Skycons from 'react-skycons';

class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timezone: null,
            summary: null,
            daily_icon: null,
            temp_max: null,
            temp_min: null,
            temp: null
        }

        this.updateWeather();
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            900000
        );
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
                var daily_icon = this.get_fixed_icon(weather.daily.icon);

                this.setState({
                    timezone: weather.timezone,
                    summary: weather.hourly.summary,
                    daily_icon: daily_icon,
                    temp_max: weather.daily.data[0].apparentTemperatureMax,
                    temp_min: weather.daily.data[0].apparentTemperatureMin,
                    temp: weather.currently.apparentTemperature,
                    rain_chance: weather.daily.data[0].precipProbability * 100,
                    hourly: weather.hourly.summary,
                    hourly_data: weather.hourly.data
                });
            })
            .catch(res => {
                console.log("Error: " + res);
            })
    }

    hourly_forecast() {
        var data = this.state.hourly_data;
        var hours = [];
        if(data) {
            for(var i = 0; i < 12; i++) {
                var date = new Date(data[i].time * 1000);
                var hour = date.getHours();
                // Pad
                if (hour < 10) {
                    hour = "0" + hour
                }

                // Only animate certain icons
                var animated_icons = [
                    'rain',
                    'snow',
                    'wind',
                    'sleet'
                ]
                var is_animated = !animated_icons.indexOf(data[i].icon);

                hours.push(
                    <div className={data[i].icon}>
                        <div className="hourly-time">
                            {hour}:00
                        </div>
                        <div className="hourly-icon">
                            <Skycons
                                color='white'
                                icon={this.get_fixed_icon(data[i].icon)}
                                autoplay={is_animated}
                            />
                        </div>
                        <div className="hourly-temp">
                            {Math.round(data[i].apparentTemperature)}°
                        </div>
                    </div>
                )
            }
        }
        return (
            hours
        )
    }

    // For some reason, the skycons-react package requires uppercase
    // and underscores instead of hiphens, despite the Darksky API
    // not returning it in this format.
    get_fixed_icon(icon) {
        return icon.toUpperCase().replace(/-/g , "_");
    }

    get_icon_colour(icon) {
        switch(icon) {
            case "rain":
            case "sleet":
                return "#0288d1";

            case "partly-cloudy-night":
            case "clear-night":
                return "#0d47a1";

            case "clear-day":
            case "partly-cloudy-day":
                return "#ffb300";

            case "cloudy":
            case "wind":
            case "fog":
                return "#9e9e9e";

            case "snow":
                return "90a4ae";

            default:
                return "#0288d1"

        }
    }

    render () {
        return (
            <div className="weather">
                <div className="weather-summary">
                    <div>{this.state.summary}</div>
                </div>
                <div className="middle-row">
                    <div className="temperature">
                        <span className="current-temp">
                            {Math.round(this.state.temp)}°
                        </span>
                        <span className="min-max-temp">
                            {Math.round(this.state.temp_min)}° | {Math.round(this.state.temp_max)}°
                        </span>
                    </div>
                    <div className="weather-icon">
                        <Skycons
                            color="white"
                            icon={this.state.daily_icon}
                        />
                    </div>
                    <div className="rain-chance">
                        <div className="chance-text">Chance of rain:</div>
                        <div className="chance-percentage">{this.state.rain_chance}%</div>
                    </div>
                </div>
                <div className="hourly-timeline">
                  {this.hourly_forecast()}
                </div>
            </div>
        );
    }
}

export default Weather;
