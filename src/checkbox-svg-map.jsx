import React from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class CheckboxSVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocations: []
		};

		this.isLocationSelected = this.isLocationSelected.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationKeyDown = this.handleLocationKeyDown.bind(this);
	}

	/**
	 * Indicate whether a location is selected
	 * 
	 * @param {Object} location - Location object
	 * @returns {boolean} True if the location is selected
	 */
	isLocationSelected(location) {
		return this.state.selectedLocations.findIndex(selectedLocation => selectedLocation.id === location.id) > -1;
	}

	/**
	 * Select/deselect a location
	 * 
	 * @param {Event} event - Triggered event
	 */
	toggleLocation(event) {
		const location = event.target;

		this.setState(prevState => {
			// Copy old state
			let selectedLocations = [...prevState.selectedLocations];

			if (location.attributes['aria-checked'].value === 'true') {
				// Delete location
				selectedLocations.splice(selectedLocations.indexOf(location), 1);
			} else {
				// Add location
				selectedLocations.push(location);
			}

			// Call onChange event handler
			if (this.props.onChange) {
				this.props.onChange(selectedLocations);
			}

			// Return new state
			return { selectedLocations };
		});
	}

	/**
	 * Handle click on a location
	 * 
	 * @param {Event} event - Triggered click event
	 */
	handleLocationClick(event) {
		event.preventDefault();
		this.toggleLocation(event);
	}

	/**
	 * Handle spacebar down on a location
	 * 
	 * @param {Event} event - Triggered keydown event
	 */
	handleLocationKeyDown(event) {
		// Spacebar
		if (event.keyCode === 32) {
			event.preventDefault();
			this.toggleLocation(event);
		}
	}

	render() {
		return (
			<SVGMap
				map={this.props.map}
				role="group"
				locationRole="checkbox"
				isLocationSelected={this.isLocationSelected}
				onLocationClick={this.handleLocationClick}
				onLocationKeyDown={this.handleLocationKeyDown}
				onLocationMouseOver={this.props.onLocationMouseOver}
				onLocationMouseOut={this.props.onLocationMouseOut}
				onLocationFocus={this.props.onLocationFocus}
				onLocationBlur={this.props.onLocationBlur}
			/>
		);
	}
}

CheckboxSVGMap.propTypes = {
	onChange: PropTypes.func,

	// SVGMap props
	map: PropTypes.shape({
		viewBox: PropTypes.string.isRequired,
		locations: PropTypes.arrayOf(
			PropTypes.shape({
				path: PropTypes.string.isRequired,
				name: PropTypes.string,
				id: PropTypes.string
			})
		).isRequired,
		label: PropTypes.string
	}).isRequired,
	className: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
};

export default CheckboxSVGMap;