import React from 'react';
import { ajax } from 'jquery';
import '../normalize.css';
import './addTicket.css';

class AddTicket extends React.Component {
	constructor() {
		super();
		this.getData = this.getData.bind(this);
		this.findLocation = this.findLocation.bind(this);
		this.getFile = this.getFile.bind(this);
		this.submitToFirebase = this.submitToFirebase.bind(this);
		this.sendToFirebase = this.sendToFirebase.bind(this);	
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
		const dbRef = firebase.database().ref(`users/${this.props.uid}`)
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
				<div className="addTicket">
					<h2> Add a Stub!</h2>
					<form id="addTicketForm" onSubmit={this.submitToFirebase}>
						<div className="addTicketForm__section">
							<label htmlFor="showName">Name of Event:</label>
							<input className="addTicketForm__input" id="showName" name="showName" type="text" value={this.state.showName} onChange={(e) => this.getData(e)}/>
							<label htmlFor="date">Date of Event:</label>
							<input className="addTicketForm__input" type="date" name="showDate" id="date" onChange={(e) => this.getData(e)} value={this.state.showDate}/>
						</div>
						<div className="addTicketForm__section">
							<label htmlFor="showLocation">Location of event:</label>
							<input className="addTicketForm__input" value={this.state.showLocation} list="places" id="showLocation" type="text" onChange={(e) => this.findLocation(e)}/>
							<datalist id="places">{places}</datalist>
							<label htmlFor="file">Choose File</label>
							<input 
								id="file" 
								className="addTicketForm__input addTicketForm__input--hidden" 
								type="file" 
								onChange={(e) => this.getFile(e)} 
								capture="camera"
							/>
						</div>
						<input type="submit" value="submit"/>
					</form>
				</div>
			)
	}

}

export default AddTicket;