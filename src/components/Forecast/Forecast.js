import React from 'react';
import HourlyWeather from '../HourlyWeather/HourlyWeather';
import SelectInput from '../SelectInput/SelectInput';

import css from './Forecast.css';

export default class Forecast extends React.Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		weatherByDay: [],
    		selectedDay: {}
    	};
  	};

  	componentWillReceiveProps(props) {
    	let weatherByDay = [];
  		props.forecast && props.forecast.forEach(
  			(weather) => {
  				let day = weather.dt_txt.split(" ")[0];

  				let found = false;
  				
  				for(var i = 0; i < weatherByDay.length; i++) {
  					if (weatherByDay[i].day === day) {
	  					found = true;
	  					weatherByDay[i].listHours.push(weather);
	  					break;
	  				}
  				}

  				if(!found) {
  					weatherByDay.push({day: day, listHours: [weather]})
  				}
  			}
  		)
  		this.setState({weatherByDay, selectedDay: weatherByDay[0]});
  	}

  	onChange = (selectedDay) => {
  		let weatherByDay = this.state.weatherByDay
  		this.setState({selectedDay : weatherByDay[selectedDay]});
  	}

 	render() {
 		let weatherByDay = this.state.weatherByDay;
 		let selectedDay = this.state.selectedDay;

 		return (
 			<div className='container'>
				{weatherByDay.length > 0 && selectedDay && <SelectInput list={weatherByDay} name='day' value='listHours' valueChange={this.onChange} select={selectedDay.day}/>}
	 			<div className={'dayContainer'}>
					<div className='forecast'>
			 		{ 
			 			selectedDay && selectedDay.listHours && selectedDay.listHours.map(
				 			(weather, key) => {
				 				return <HourlyWeather weather={weather} key={key} />
				 			}
				 		) 
				 	}
			 		</div>
				</div> 
		 	</div>
 		);
 	}
}