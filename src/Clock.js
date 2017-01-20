/**
 * Created by ajcal on 08/01/2017.
 */

import React, { Component} from 'react';


class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    getDay(day_number) {
        var weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
        return weekdays[day_number];
    }

    render() {
        return (
            <div className="Clock">
                <span>{this.getDay(this.state.date.getDay())}</span>
                <span>{this.state.date.toLocaleTimeString('en-GB', { hour12: false })}</span>
                <span>{this.state.date.toLocaleDateString('en-GB')}</span>
            </div>
        );
    }
}

export default Clock;
