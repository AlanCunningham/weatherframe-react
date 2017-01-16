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

    render() {
        return (
            <div className="Clock">
                <h1>{this.state.date.toLocaleTimeString('en-GB', { hour12: false })}</h1>
            </div>
        );
    }
}

export default Clock;
