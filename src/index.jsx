import React from 'react';
import TaiwanMap from './maps/taiwan';
import './index.scss';

function SVGMap(props) {
	// Set default props
	const map = props.map || TaiwanMap;
	const tabIndex = props.tabIndex || '0'; // Make it focusable
	const role = props.type || 'none';

	// Warn message when isLocationSelected function is not provided
	if ((role === 'checkbox' || role === 'radio') && !(props.isLocationSelected instanceof Function)) {
		console.warn('No isLocationSelected function provided.');
	}

	return (
		<svg className="svg-map" xmlns="http://www.w3.org/2000/svg" viewBox={map.viewBox} role="group" aria-label={map.label}>
		{
			map.locations.map(location => {
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

export default SVGMap;
