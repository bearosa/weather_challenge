import React from 'react';
import Autosuggest from 'react-autosuggest';
import Forecast from '../components/Forecast';
import cities from '../utils/EuropeanCapitals.json';
import { api } from '../utils/api';

import css from '../index.css';

const getSuggestions = value => {
  	const inputValue = value.trim().toLowerCase();
  	const inputLength = inputValue.length;

  	return inputLength === 0 ? [] : cities.filter(city =>
    	city.CapitalName.toLowerCase().slice(0, inputLength) === inputValue
  	);
};

const getSuggestionValue = suggestion => suggestion.CapitalName + ", " + suggestion.CountryCode;

const renderSuggestion = suggestion => (
  	<div>
    	{suggestion.CapitalName + ", " + suggestion.CountryCode}
  	</div>
);


export default class WeatherInfo extends React.Component {
	constructor() {
    	super();
    	this.state = {
      		value: '',
      		suggestions: [],
      		weatherForecast: {}
    	};
  	};

	onChange = (event, { newValue }) => {
		let city = newValue.trim();
		let forecast = api.getWeatherInfo(city);
		this.setState({
			value: newValue,
			weatherForecast: forecast
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
    	this.setState({
      		suggestions: getSuggestions(value)
    	});
  	};

  	onSuggestionsClearRequested = () => {
    	this.setState({
      		suggestions: []
    	});
  	};

 	render() {
 		const { value, suggestions } = this.state;;

 		const inputProps = {
      		placeholder: 'Enter a city',
      		value,
      		onChange: this.onChange
    	};

 		return (
 			<div>
				<Autosuggest 	suggestions={suggestions}
	    						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
	    						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
	    						getSuggestionValue={getSuggestionValue}
	    						renderSuggestion={renderSuggestion}
	    						inputProps={inputProps} />
	    		<Forecast />
	    	</div>
 		);
 	}
}