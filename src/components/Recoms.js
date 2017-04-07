import React from 'react';
import { ajax } from 'jquery';

class Recoms extends React.Component {
	constructor() {
		super();
		this.state ={
			results: [],
			searchParam: '',
		}
	}
	getSearchParam = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	componentDidMount = () => {
		console.log('get results')
		ajax({
			url: ' https://api.seatgeek.com/2/taxonomies?client_id=NzIyNzY4NHwxNDkxMjYwNDAyLjA1',
			method: 'GET',

		}).then((data) => {
			console.log(data)
			this.setState({
				results: data.taxonomies
			})
		})
	}
	render() {
		const eventResults = this.state.results.map((item) => {
			console.log(item)
			return (
				<option>{item.name}</option>
				)
		})
		return (
				<div> 
					<h1> Search for Recommendations</h1> 
					<select id="events">
						{eventResults}
					</select>
				</div>
			)
	}
}

export default Recoms;