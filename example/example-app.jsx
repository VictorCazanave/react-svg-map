import React from 'react';
import SVGMap from '../src/';
import Taiwan from '../src/maps/taiwan';
import '../src/index.scss';
import './example-app.scss';

class ExampleApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocations: []
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
	}

	handleLocationMouseOver(event) {
		const locationName = event.target.attributes.name.value;
		this.setState({ pointedLocation: locationName });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null });
	}

	handleLocationClick(event) {
		const clickedLocation = { id: event.target.id, name: event.target.attributes.name.value };
		const isSelected = event.target.attributes['aria-checked'].value === 'true';
		let selectedLocations = [];

		this.setState(prevState => {
			if (isSelected) {
				// Remove clickedLocation
				selectedLocations = prevState.selectedLocations.filter(location => location.id !== clickedLocation.id);
			} else {
				// Add clickedLocation
				selectedLocations = [...prevState.selectedLocations, clickedLocation];
			}

			const newState = {
				pointedLocation: prevState.pointedLocation,
				focusedLocation: prevState.focusedLocation,
				selectedLocations: selectedLocations
			};

			return newState
		});
	}

	handleLocationFocus(event) {
		const locationName = event.target.attributes.name.value;
		this.setState({ focusedLocation: locationName });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	isLocationSelected(location) {
		return this.state.selectedLocations.findIndex(selectedLocation => selectedLocation.id === location.id) > -1;
	}

	render() {
		return (
			<section className="example">
				<h1 className="example__title">
					Example of <a href="https://github.com/VictorCazanave/react-svg-map">react-svg-map</a>
				</h1>
				<div className="example__info">
					<div className="example__info__block">
						Pointed location: {this.state.pointedLocation}
					</div>
					<div className="example__info__block">
						Focused location: {this.state.focusedLocation}
					</div>
					<div className="example__info__block">
						Selected locations:
							<ul>
								{
									this.state.selectedLocations.map(location => (<li key={location.id}>{location.name}</li>))
								}
							</ul>
						</div>
				</div>
				<div className="example__map">
					<SVGMap
						map={Taiwan}
						type="checkbox"
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationClick={this.handleLocationClick}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						isLocationSelected={this.isLocationSelected} />
				</div>
			</section>
		);
	}
}

export default ExampleApp;
