import React from 'react';
import { ajax } from 'jquery';
import SearchPlaces from './searchPlace.js';
import Events from './Events.js'; 
// import findLocation from './services.js';


class Recoms extends React.Component {
	constructor() {
		super();
		this.state ={
			results: [],
			searchParam: '',
			eventResults: []
		}
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
	getEvents = (e) => {
		e.preventDefault()
		console.log('get stuff')
		ajax({
			url: `https://api.seatgeek.com/2/events?client_id=NzIyNzY4NHwxNDkxMjYwNDAyLjA1&taxonomies.id=${this.state.searchParam}`,
			method:'GET',
		}).then((data) => {
			console.log(data.events)
			this.setState({
				eventResults: data.events
			})
		})

	}
	updateState = (e) => {
		// e.preventDefault();
		console.log(e.target.value)
		this.setState({
				searchParam: e.target.value
		})
	}
	render() {
		const eventResults = this.state.results.map((item, index) => {
			let idTag = item.name.toLowerCase()
			// console.log(idTag)
			return (
				<li key={`${item.name}${index}`}>
					<label name="eventType" htmlFor={idTag}>
						<input name="eventType" id={idTag} value={item.id} type="radio" onChange={(e) => this.updateState(e)}/>
						{item.name}</label>
				</li>
				)
		})
		return (
				<div> 
					<h1> Search for Recommendations</h1> 
					<div>
						<SearchPlaces title="Enter a City"/>
					</div>
					<div className="scrollList">
					{eventResults}
					</div>
					<input type="submit" value="find events!" onClick={(e) => this.getEvents(e)} />
					<Events data={this.state.eventResults}/>
				</div>
			)
	}
}

export default Recoms;