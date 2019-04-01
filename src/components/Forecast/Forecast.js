import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HourlyWeather from '../HourlyWeather/HourlyWeather';
import SelectInput from '../SelectInput/SelectInput';

import css from './Forecast.css';

class WeatherCards extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {};
	}

	render() {
		let selectedDay = this.props.selectedDay;

		return (
			<div className='forecast'>
		 		{selectedDay.listHours && selectedDay.listHours.map(
			 			(weather, key) => {
			 				return <HourlyWeather weather={weather} key={key} />
			 			}
			 		) 
			 	}
	 		</div>
		);
	}
}

export default class Forecast extends React.Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		weatherByDay: [],
    		selectedDay: {}
    	};
  	};

  	componentWillReceiveProps(nextProps) {
  		if(this.props.forecast !== nextProps.forecast) {
  			let weatherByDay = [];
	  		nextProps.forecast && nextProps.forecast.forEach(
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
	  					weatherByDay.push({id: weather.dt, day: day, listHours: [weather]})
	  				}
	  			}
	  		)
	  		this.setState({weatherByDay, selectedDay: weatherByDay[0]});
  		}
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
				{weatherByDay.length > 0 && selectedDay && 
					<CSSTransition 	in
				        			appear={weatherByDay.length > 0}
				        			timeout={300}
				        			classNames="select-animation" >
						<SelectInput 	list={weatherByDay} 
										name='day' 
										value='listHours' 
										valueChange={this.onChange} 
										select={selectedDay.day}/>
					</CSSTransition>
				}
	 			{selectedDay && 
	 				<TransitionGroup className='transitionGroup'>
		 				<CSSTransition 	appear
		 								key={selectedDay.id}
					        			timeout={2000}
								        onEnter={node => node.offsetHeight}
								        mountOnEnter
								        unmountOnExit
					        			classNames="weather-animation" >
					        <div className='dayContainer'>
								<WeatherCards selectedDay={selectedDay} />
							</div>
					 	</CSSTransition>
					</TransitionGroup>
				} 
		 	</div>
 		);
 	}
}