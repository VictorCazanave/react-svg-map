import React from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class RadioSVGMap extends React.Component {
	constructor(props) {
		super(props);

		//FIXME: What to put in state?
		this.state = {
			// DOM nodes
			locations: null,
			selectedLocation: null
		};

		// Get locations nodes from SVGMap component
		this.setNodes = component => {
			this.locations = component.paths;
		};

		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationKeyDown = this.handleLocationKeyDown.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
	}

	componentDidMount() {
		// First location is focusable
		this.locations[0].setAttribute('tabindex', '0');
	}

	selectLocation(location) {

		// Unfocus current selected location
		if (this.state.selectedLocation) {
			this.state.selectedLocation.setAttribute('tabindex', '-1');
		}

		// Focus new selected location
		location.setAttribute('tabindex', '0');
		location.focus();

		// Change selected location
		this.setState({ selectedLocation: location });

		// Call onChange event handler
		this.props.onChange(location);
	}

	handleLocationClick(event) {
		this.selectLocation(event.target);
	}

	handleLocationKeyDown(event) {
		const focusedLocation = event.target;

		// Arrow down or right
		if (event.keyCode === 39 || event.keyCode === 40) {
			// Next or first location
			const nextLocation = focusedLocation.nextSibling || this.locations[0];

			event.preventDefault();
			this.selectLocation(nextLocation);

			// Arrow up or left
		} else if (event.keyCode === 37 || event.keyCode === 38) {
			// Previous or last location
			const previousLocation = focusedLocation.previousSibling || this.locations[this.locations.length - 1];

			event.preventDefault();
			this.selectLocation(previousLocation);
		}
	}

	isLocationSelected(location) {
		return this.state.selectedLocation === location;
	}

	render() {
		return (
			<SVGMap
				map={this.props.map}
				role="radiogroup"
				locationTabIndex="-1"
				locationRole="radio"
				onLocationClick={this.handleLocationClick}
				onLocationKeyDown={this.handleLocationKeyDown}
				isLocationSelected={this.isLocationSelected}
				onLocationMouseOver={this.props.onLocationMouseOver}
				onLocationMouseOut={this.props.onLocationMouseOut}
				onLocationFocus={this.props.onLocationFocus}
				onLocationBlur={this.props.onLocationBlur}
				onChange={this.props.onChange}
				ref={this.setNodes}
			/>
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
