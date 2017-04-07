import React from 'react';
import { ajax } from 'jquery';

class AddTicket extends React.Component {
	constructor() {
		super();
		this.getData = this.getData.bind(this);
		this.findLocation = this.findLocation.bind(this);
		this.getFile = this.getFile.bind(this);
		this.submitToFirebase = this.submitToFirebase.bind(this);

		this.state = {
			showName: '',
			showDate: '',
			showLocation: '',
			image: '',
			url: '',
			googlePredictions: [],
		}
	}
	getFile = (e) => {
		this.setState({
			image: e.target.files[0]
		})
	}
	findLocation = (e) => {
		this.setState({
			showLocation: e.target.value
		})
		ajax({
				url: 'http://proxy.hackeryou.com',
				dataType: 'json',
				method: 'GET',
				data: {
					reqUrl: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
					params: {
							key: 'AIzaSyBScitqRVCjqn6aAaOsz2W393ByreE1BEo',
							input: this.state.showLocation
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
	submitToFirebase = (e) => {
		e.preventDefault();
		console.log('submitted')

		let file = this.state.image;
		const firebase = window.firebase;
		const storageRef = firebase.storage().ref('images/' + file.name);
		storageRef.put(file).then(function(snapshot){
			storageRef.getDownloadURL().then(function(url){
				console.log(url)
				this.setState({
					url: url
				})
			this.sendToFirebase()
			}.bind(this))
		}.bind(this))
		// const urlRef = firebase.storage().child('images/').getDownloadURL().then(function(url){
		// 	console.log(url)
		// 	this.setState({
		// 		url: url
		// 	})
		// }.bind(this))
	}
	sendToFirebase = () => {
		let showItem = {
				name: this.state.showName,
				date: this.state.showDate,
				location: this.state.showLocation,
				url: this.state.url
		}
		const firebase = window.firebase;
		const dbRef = firebase.database().ref()
		dbRef.push(showItem)
		this.setState ({
			url: '',
			showName: '',
			showDate: '',
			showLocation: '',
			image: '',
			googlePredictions: [],
		})
		const form = document.getElementById('addTicketForm');
		form.reset();
	}
	resetState = () => {
		console.log('resetting')
		
	}
	getData = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		let places = this.state.googlePredictions.map((item) => {
			console.log(item.description)
			return (<option value={item.description} key={item.description}>{item.description}</option>)
		})
		return (
				<div>
					<p> Add ticket here</p>
					<form id="addTicketForm" onSubmit={this.submitToFirebase}>
						<label htmlFor="showName">Name of Show!</label>
						<input id="showName" name="showName" type="text" value={this.state.showName} onChange={(e) => this.getData(e)}/>
						<input type="date" name="showDate" onChange={(e) => this.getData(e)} value={this.state.showDate}/>
						<label htmlFor="showLocation">Location of show</label>
						<input value={this.state.showLocation} list="places" id="showLocation" type="text" onChange={(e) => this.findLocation(e)}/>
						<datalist id="places">{places}</datalist>
						<input type="file" onChange={(e) => this.getFile(e)} capture="camera"/>
						<input type="submit" value="submit"/>
					</form>
				</div>
			)
	}

}

export default AddTicket;