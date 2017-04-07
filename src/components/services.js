// import React from 'react';
import { ajax } from 'jquery';

exports.find = function() {
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

// export default findLocation;