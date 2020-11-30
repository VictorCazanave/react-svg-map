import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class RadioSVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocation: null
		};

		this.getLocationTabIndex = this.getLocationTabIndex.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationKeyDown = this.handleLocationKeyDown.bind(this);
	}

	componentDidMount() {
		// List of location nodes
		// TODO: Find a cleaner way
		// Cannot use ref on SvgMap (with React 16.0.0) because it is a functional component
		// https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.app/docs/refs-and-the-dom.html#refs-and-functional-components
		this.locations = [...ReactDOM.findDOMNode(this).getElementsByTagName('path')];

		// Set initial selected location
		if (this.props.selectedLocationId) {
			const selectedLocation = this.locations.find(location => location.id === this.props.selectedLocationId);

			this.setState({ selectedLocation });
		}
	}

	/**
	 * Get location tabindex value
	 * 
	 * @param {Object} location - Location object
	 * @param {number} index - Index of location
	 * @returns {string} Value of tabindex HTML attribute
	 */
	getLocationTabIndex(location, index) {
		let tabIndex = null;

		if (this.state.selectedLocation) {
			// Only selected location is focusable
			tabIndex = this.isLocationSelected(location) ? '0' : '-1';
		} else {
			// Only first location is focusable
			tabIndex = index === 0 ? '0' : '-1';
		}

		return tabIndex;
	}

	/**
	 * Indicate whether a location is selected
	 *
	 * @param {Object} location - Location object
	 * @returns {boolean} True if the location is selected
	 */
	isLocationSelected(location) {
		return this.state.selectedLocation && this.state.selectedLocation.id === location.id;
	}

	/**
	 * Select a location
	 * 
	 * @param {Node} location - Location DOM node
	 */
	selectLocation(location) {
		// Focus new selected location
		location.focus();

		// Change selected location
		this.setState({ selectedLocation: location });

		// Call onChange event handler
		if (this.props.onChange) {
			this.props.onChange(location);
		}
	}

	/**
	 * Handle click on a location
	 *
	 * @param {Event} event - Triggered click event
	 */
	handleLocationClick(event) {
		const clickedLocation = event.target;

		// Select clicked location if not already selected
		if (clickedLocation !== this.state.selectedLocation) {
			this.selectLocation(clickedLocation);
		}
	}

	/**
	 * Handle spacebar and arrows down on a location
	 *
	 * @param {Event} event - Triggered keydown event
	 */
	handleLocationKeyDown(event) {
		const focusedLocation = event.target;

		// Spacebar
		if (event.keyCode === 32) {
			event.preventDefault();

			// Select focused location if not already selected
			if (focusedLocation !== this.state.selectedLocation) {
				this.selectLocation(focusedLocation);
			}

			// Arrow down or right
		} else if (event.keyCode === 39 || event.keyCode === 40) {
			event.preventDefault();

			// Select next or first location
			this.selectLocation(focusedLocation.nextSibling || this.locations[0]);

			// Arrow up or left
		} else if (event.keyCode === 37 || event.keyCode === 38) {
			event.preventDefault();

			// Select previous or last location
			this.selectLocation(focusedLocation.previousSibling || this.locations[this.locations.length - 1]);
		}
	}

	render() {
		return (
			<SVGMap
				map={this.props.map}
				role="radiogroup"
				locationTabIndex={this.getLocationTabIndex}
				locationRole="radio"
				className={this.props.className}
				locationClassName={this.props.locationClassName}
				locationAriaLabel={this.props.locationAriaLabel}
				isLocationSelected={this.isLocationSelected}
				onLocationClick={this.handleLocationClick}
				onLocationKeyDown={this.handleLocationKeyDown}
				onLocationMouseOver={this.props.onLocationMouseOver}
				onLocationMouseOut={this.props.onLocationMouseOut}
				onLocationMouseMove={this.props.onLocationMouseMove}
				onLocationFocus={this.props.onLocationFocus}
				onLocationBlur={this.props.onLocationBlur}
				onChange={this.props.onChange}
				childrenBefore={this.props.childrenBefore}
				childrenAfter={this.props.childrenAfter}
			/>
		);
	}
}

RadioSVGMap.propTypes = {
	selectedLocationId: PropTypes.string,
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
	locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationAriaLabel: PropTypes.func,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	childrenBefore: PropTypes.node,
	childrenAfter: PropTypes.node,
};

export default RadioSVGMap;
