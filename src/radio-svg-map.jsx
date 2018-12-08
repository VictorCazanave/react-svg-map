import React from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class RadioSVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocation: null
		};

		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
	}

	handleLocationClick(event) {
		const selectedLocation = event.target.attributes.name.value;

		// Change selected location
		this.setState({ selectedLocation });

		// Call onChange event handler
		this.props.onChange(selectedLocation);
	}

	isLocationSelected(location) {
		return this.state.selectedLocation === location;
	}

	render() {
		return (
			<SVGMap
				map={this.props.map}
				type="radio"
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

RadioSVGMap.propTypes = {
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

export default RadioSVGMap;
