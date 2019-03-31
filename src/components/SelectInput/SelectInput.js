import React      from 'react';

import css from './SelectInput.css'

export default class SelectInput extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.valueChange = this.valueChange.bind(this);
		this.mappingList = this.mappingList.bind(this);
	};

	handleChange(event){
		this.valueChange(event.target.value);
	};

	valueChange(value){
		this.props.valueChange(value)
	};

	mappingList() {
		var name = this.props.name;
		return this.props.list.map((item, key) => { 
			console.log(item);
			return (<option key={key} value={key}>{item[name]}</option>)
		});
	}

	render() {
	 	var options = this.mappingList();
		var style = {};
		var value = this.props.selected;
		
		return (
			<select	className='input'
				   	onChange={this.handleChange}
				   	value={value}>
			   	{options}
			</select>
		);
	}
}