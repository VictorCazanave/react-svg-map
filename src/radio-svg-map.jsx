import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

const RadioSVGMap = forwardRef((props, ref) => {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const locationsRef = useRef([]);
	const mapRef = useRef();

	useEffect(() => {
		if (ref?.current ?? mapRef.current) {
			const map = ref?.current ?? mapRef.current;
			const locations = [...map.getElementsByTagName('path')];
			locationsRef.current = locations;

			// Set initial selected location
			if (props.selectedLocationId) {
				const foundLocation = locations.find(
					location => location.id === props.selectedLocationId
				);

				setSelectedLocation(foundLocation);
			}
		}
	}, [props.selectedLocationId]);

	/**
	 * Get location tabindex value
	 *
	 * @param {Object} location - Location object
	 * @param {number} index - Index of location
	 * @returns {string} Value of tabindex HTML attribute
	 */
	const getLocationTabIndex = (location, index) => {
		let tabIndex = null;

		if (selectedLocation) {
			// Only selected location is focusable
			tabIndex = isLocationSelected(location) ? '0' : '-1';
		} else {
			// Only first location is focusable
			tabIndex = index === 0 ? '0' : '-1';
		}

		return tabIndex;
	};

	/**
	 * Indicate whether a location is selected
	 *
	 * @param {Object} location - Location object
	 * @returns {boolean} True if the location is selected
	 */
	const isLocationSelected = location => {
		return selectedLocation && selectedLocation.id === location.id;
	};

	/**
	 * Select a location
	 *
	 * @param {Node} location - Location DOM node
	 */
	const selectLocation = location => {
		// Focus new selected location
		location.focus();

		// Change selected location
		setSelectedLocation(location);

		// Call onChange event handler
		if (props.onChange) {
			props.onChange(location);
		}
	};

	/**
	 * Handle click on a location
	 *
	 * @param {Event} event - Triggered click event
	 */
	const handleLocationClick = event => {
		const clickedLocation = event.target;

		// Select clicked location if not already selected
		if (clickedLocation !== selectedLocation) {
			selectLocation(clickedLocation);
		}
	};

	/**
	 * Handle spacebar and arrows down on a location
	 *
	 * @param {Event} event - Triggered keydown event
	 */
	const handleLocationKeyDown = event => {
		const focusedLocation = event.target;

		// Spacebar
		if (event.keyCode === 32) {
			event.preventDefault();

			// Select focused location if not already selected
			if (focusedLocation !== selectedLocation) {
				selectLocation(focusedLocation);
			}

			// Arrow down or right
		} else if (event.keyCode === 39 || event.keyCode === 40) {
			event.preventDefault();

			// Select next or first location
			selectLocation(focusedLocation.nextSibling || locations[0]);

			// Arrow up or left
		} else if (event.keyCode === 37 || event.keyCode === 38) {
			event.preventDefault();

			// Select previous or last location
			selectLocation(
				focusedLocation.previousSibling ||
					locationsRef.current[locationsRef.current.length - 1]
			);
		}
	};

	return (
		<SVGMap
			childrenAfter={props.childrenAfter}
			childrenBefore={props.childrenBefore}
			className={props.className}
			isLocationSelected={isLocationSelected}
			locationAriaLabel={props.locationAriaLabel}
			locationClassName={props.locationClassName}
			locationRole='radio'
			locationTabIndex={getLocationTabIndex}
			map={props.map}
			onChange={props.onChange}
			onLocationBlur={props.onLocationBlur}
			onLocationClick={handleLocationClick}
			onLocationFocus={props.onLocationFocus}
			onLocationKeyDown={handleLocationKeyDown}
			onLocationMouseMove={props.onLocationMouseMove}
			onLocationMouseOut={props.onLocationMouseOut}
			onLocationMouseOver={props.onLocationMouseOver}
			ref={ref ?? mapRef}
			role='radiogroup'
		/>
	);
});

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
				id: PropTypes.string,
			})
		).isRequired,
		label: PropTypes.string,
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
