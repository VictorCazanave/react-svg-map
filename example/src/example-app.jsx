import React from 'react';
import { SVGMap, Taiwan } from '../../src/';
import { getLocationName, getLocationSelected } from './utils';
import '../../src/svg-map.scss';
import './example-app.scss';

class ExampleApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocations: new Set()
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
	}

	handleLocationMouseOver(event) {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null });
	}

	handleLocationClick(event) {
		const clickedLocation = getLocationName(event);
		const isSelected = getLocationSelected(event);

		this.setState(prevState => {
			let selectedLocations = new Set(prevState.selectedLocations);

			if (isSelected) {
				selectedLocations.delete(clickedLocation);
			} else {
				selectedLocations.add(clickedLocation);
			}

			return { ...prevState, selectedLocations };
		});
	}

	handleLocationFocus(event) {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	isLocationSelected(location) {
		return this.state.selectedLocations.has(location.name);
	}

	render() {
		return (
			<section className="example">
				<h1 className="example__title">
					Example of <a href="https://www.npmjs.com/package/react-svg-map">react-svg-map</a>
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
								[...this.state.selectedLocations].map(location => (<li key={location}>{location}</li>))
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
