import React from 'react';

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
		return(<li key={`${item.show}${index}`}>
			<h2>{item.name}</h2>
			<p>{item.location}</p>
			<img src={item.url} alt={item.name}/>
			</li>)
	});
	return (
			<ul> {tickets} </ul>
		);
	}
}

export default Tickets;