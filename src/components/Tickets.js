import React from 'react';
import './tickets.css';

class Tickets extends React.Component {
	constructor() {
		super();
		this.getRecoms = this.getRecoms.bind(this);
		this.state = {
			modal: false,
			recommendations:[]
		}
	}
	getRecoms = (e) => {
		e.preventDefault();
		const searchParam = e.target.getAttribute('id')
		console.log(searchParam)
		console.log('ajax call here')
	}
	render() {
	const tickets = this.props.items.map((item, index) => {
		console.log(item)
		return(<li key={`${item.show}${index}`} className="tickets__item">
			<div className="ticketActions">
				<button onClick={(item) => this.props.editTicket(item)} id={item.name}>Edit Me!</button>
			</div>
			<div className="ticketInfo">
				<h2>{item.name}</h2>
				<p>{item.location}</p>
			</div>
			<div className="imgContain">
				<img src={item.url} alt={item.name}/>
			</div>
			</li>)
	});
	return (
			<section className="tickets">
			<h2>Your Stub Collection</h2>
			<ul className="ticketsContain"> {tickets} </ul>
			</section>
		);
	}
}

export default Tickets;