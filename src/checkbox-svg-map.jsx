import React from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class CheckboxSVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocations: []
		};

		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
	}

	handleLocationClick(event) {
		const location = event.target.attributes.name.value;

		this.setState(prevState => {
			// Copy old state
			let selectedLocations = [...prevState.selectedLocations];

			// Add or delete location
			if (event.target.attributes['aria-checked'].value === 'true') {
				const index = selectedLocations.indexOf(location);
				selectedLocations.splice(index, 1);
			} else {
				selectedLocations.push(location);
			}

			// Call onChange event handler
			this.props.onChange(selectedLocations);

			// Return new state
			return { selectedLocations };
		});

	}

	isLocationSelected(location) {
		return this.state.selectedLocations.indexOf(location) > -1;
	}

	render() {
		return (
			<SVGMap
				map={this.props.map}
				type="checkbox"
				onLocationClick={this.handleLocationClick}
				isLocationSelected={this.isLocationSelected}
				onLocationMouseOver={this.props.onLocationMouseOver}
				onLocationMouseOut={this.props.onLocationMouseOut}
				onLocationFocus={this.props.onLocationFocus}
				onLocationBlur={this.props.onLocationBlur}
				onChange={this.props.onChange} />
		);
	}
}

CheckboxSVGMap.propTypes = {
	onChange: PropTypes.func,

	// SVG map props
	map: PropTypes.node.isRequired,
	className: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
};

export default CheckboxSVGMap;
