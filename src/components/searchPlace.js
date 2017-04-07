import React from 'react';
import { ajax } from 'jquery';

class SearchPlaces extends React.Component {
	constructor() {
		super();
		this.state = {
			showLocation: '',
			locationId: '',
			googlePredictions: []
		}
	}
	findLocation = (e) => {
		this.setState({
			showLocation: e.target.value,
			locationId: e.target.id
		})
		ajax({
				url: 'http://proxy.hackeryou.com',
				dataType: 'json',
				method: 'GET',
				data: {
					reqUrl: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
					params: {
							key: 'AIzaSyBScitqRVCjqn6aAaOsz2W393ByreE1BEo',
							input: this.state.showLocation,
							types: '(cities)'
						}
					},
					xmlToJSON: false
				}).then(function(response){
					console.log(response)
			let suggestions = response.predictions
			this.setState({
				googlePredictions: suggestions
			})
		}.bind(this))
	}
	getLatlong = (e) => {
		e.preventDefault()
		console.log('get lat long')
		let id = e.target.getAttribute('id')
		console.log(id)
	}
	render() {
		let places = this.state.googlePredictions.map((item) => {
			console.log(item.description)
			return (<option value={item.description} id={item.id} key={item.description}>{item.description}</option>)
		})
		return (
				<div>
					<form>
					<label htmlFor="showLocation">{this.props.title}</label>
					<input value={this.state.showLocation} list="places" id="showLocation" type="text" onChange={(e) => this.findLocation(e)}/>
					<datalist id="places">{places}</datalist>
					<input type="submit" onClick={(e) => this.getLatlong(e)} />
					</form>
				</div>

			)
	}
}

export default SearchPlaces;