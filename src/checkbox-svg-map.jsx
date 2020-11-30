import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

class CheckboxSVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// TODO: Store only ids instead of nodes?
			selectedLocations: []
		};

		this.isLocationSelected = this.isLocationSelected.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationKeyDown = this.handleLocationKeyDown.bind(this);
	}

	componentDidMount() {
		// Set initial selected locations
		if (this.props.selectedLocationIds) {
			// TODO: Find a cleaner way
			// Cannot use ref on SvgMap (with React 16.0.0) because it is a functional component
			// https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.app/docs/refs-and-the-dom.html#refs-and-functional-components
			const svgNode = ReactDOM.findDOMNode(this);
			const selectedLocations = this.props.selectedLocationIds.map(locationId => svgNode.getElementById(locationId))
				.filter(location => !!location); // Remove null locations when invalid id

			this.setState({ selectedLocations });
		}
	}

	/**
	 * Indicate whether a location is selected
	 * 
	 * @param {Object} location - Location object
	 * @returns {boolean} True if the location is selected
	 */
	isLocationSelected(location) {
		return this.state.selectedLocations.some(selectedLocation => selectedLocation.id === location.id);
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
				locationTabIndex="0"
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
				childrenBefore={this.props.childrenBefore}
				childrenAfter={this.props.childrenAfter}
			/>
		);
	}
}

CheckboxSVGMap.propTypes = {
	selectedLocationIds: PropTypes.arrayOf(PropTypes.string),
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

export default CheckboxSVGMap;
