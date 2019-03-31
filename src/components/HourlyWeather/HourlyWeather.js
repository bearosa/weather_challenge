import React from 'react';

import css from './HourlyWeather.css';

export default class HourlyWeather extends React.Component {
	constructor() {
    	super();
    	this.state = {};
  	};

 	render() {
 		const weather = this.props.weather;
 		const date = weather.dt && new Date(weather.dt * 1000);
		const hours = date.getHours();
		const isDayTime = hours > 6 && hours < 18;

 		let classWeather = "";
 		switch (weather.weather[0].description) {
 			case 'clear sky':
 				{ isDayTime ? classWeather = 'clearMorning' : classWeather = 'clearNight' };
 				break;
 			case 'few clouds':
 				{ isDayTime ? classWeather = 'partialCloudsMorning' : classWeather = 'partialCloudsNight' };
 				break;
 			case 'scattered clouds':
 			case 'broken clouds':
 			case 'overcast clouds':
 				classWeather = 'cloudy';
 				break;
 			case 'shower rain':
 				classWeather = 'showers';
 				break;
 			case 'light rain':
 			case 'rain':
 			case 'moderate rain':
 				{ isDayTime ? classWeather = 'rainMorning' : classWeather = 'rainNight' };
 				break;
 			case 'thunderstorm':
 				classWeather = 'thunderstorm';
 				break;
 			case 'snow':
 				classWeather = 'snowy';
 				break;
 			case 'mist':
 				classWeather = 'mist';
 				break;
 		};

 		console.log(weather);

 		let temperature = weather.main.temp - 270;

 		let hour = weather.dt_txt.split(" ")[1].split(":")[0];

 		return (
 			<div className='overlay'>
 				<p className="hour">{hour + 'h'}</p>
	 			<div className={'weather ' + classWeather} />
	 			<p className='description'>{weather.weather[0].description}</p>
	 			<p className='temperature'>{temperature.toFixed() + ' ºC'}</p>
	 		</div>
 		);
 	}
}