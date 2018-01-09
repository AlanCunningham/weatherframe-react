# Weatherframe
Little weather station using the [DarkSky API](https://developer.forecast.io/)
and React.  This is basically the same as my other [Weatherframe](https://github.com/AlanCunningham/weatherframe) project, originally done in Django, but now written in React. 

The screen size has been developed specifically with the [Raspberry Pi 7" touchscreen](https://www.raspberrypi.org/products/raspberry-pi-touch-display/)
in mind, but can potentially be modified to fit any sized screen.

# Requirements
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- From your terminal, run `npm install`

# Setup
- Sign up for a [Dark Sky dev account](https://darksky.net/dev/)
- Paste your Dark Sky API key into src/Weather.js in (sorry, no config file yet):

```
    getUrl() {
        var api_key = "your_dark_sky_api_key";
```

# Running everything
- From terminal, run `npm start`
