import React from 'react';


class Events extends React.Component {
	render() {
	const eventResults = this.props.data.map((item) => {
		return ( <li key={item.id}> {item.short_title} </li>
			)
	})
	return (
		<section>
		hello {eventResults}
		</section>
		)}
}

export default Events;