import React from 'react';
import { ajax } from 'jquery';


class Events extends React.Component {
	constructor() {
		super();
		this.state = {
			eventChoice: '',
			finalEventChoices: []
		}
	}
	getChoice = (e) => {
		console.log(e.target.id)
		this.setState({
			eventChoice: e.target.id
		})
		ajax({
			url: `https://api.seatgeek.com/2/recommendations?events.id=${e.target.id}&client_id=NzIyNzY4NHwxNDkxMjYwNDAyLjA1`,
			method:'GET',
		}).then((data) => {
			this.setState({
				finalEventChoices: data.recommendations
			})
		})

	}
	render() {
	const eventResults = this.props.data.map((item) => {
		console.log(item)
		let imageSrc = ''
		item.performers.map((item) => {
			console.log(item.image)
			if(item.image != null) {
				imageSrc = item.image 
			}
			else {imageSrc = 'no picture available'}
		})
		// console.log(imageObject)
		// console.log(imageSrc)
		return ( <li key={item.id}>
							<input type="radio" name="eventSelections" id={item.id} onChange={(e) => this.getChoice(e)}/>
							<label htmlFor={item.id}> 
							{item.short_title}
							</label> 
							<img src={imageSrc} alt={item.short_title} />
						</li>
			)
	})
	return (
		<section>
		{eventResults}
		</section>
		)}
}

export default Events;