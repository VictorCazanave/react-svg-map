import React from 'react';
import PropTypes from 'prop-types';

function SVGMap(props) {
	// Set default props
	const tabIndex = props.tabIndex || '0'; // Make it focusable
	const role = props.type || 'none';

	// Warn message when needed function are not provided
	if ((role === 'checkbox' || role === 'radio') && !(props.isLocationSelected instanceof Function)) {
		console.warn('No isLocationSelected function provided.');
	} else if (role === 'link' && !(props.onLocationClick instanceof Function)) {
		console.warn('No onLocationClick function provided.');
	}

	return (
		<svg className="svg-map" xmlns="http://www.w3.org/2000/svg" viewBox={props.map.viewBox} role="group" aria-label={props.map.label}>
		{
			props.map.locations.map(location => {
				return (<path
						id={location.id}
						className="svg-map__location"
						name={location.name}
						d={location.path}
						onMouseOver={props.onLocationMouseOver}
						onMouseOut={props.onLocationMouseOut}
						onClick={props.onLocationClick}
						onFocus={props.onLocationFocus}
						onBlur={props.onLocationBlur}
						tabIndex={tabIndex}
						role={role}
						aria-label={location.name}
						aria-checked={props.isLocationSelected && props.isLocationSelected(location)}
						key={location.id} />);
				}
			)
		}
	</svg>
	);
}

SVGMap.propTypes = {
	map: PropTypes.shape({
		viewBox: PropTypes.string,
		label: PropTypes.string,
		locations: PropTypes.array
	}).isRequired,
	tabIndex: PropTypes.string,
	type: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func
};

export default SVGMap;
