import React from 'react';
import TaiwanMapSVG from './TaiwanMapSVG';
import './index.scss';

function TaiwanMap(props) {
	// Set default props
	const svg = props.svg || TaiwanMapSVG;
	const tabIndex = props.tabIndex || '0'; // Make it focusable
	const role = props.type || 'none';

	// Warn message when isLocationSelected function is not provided
	if ((role === 'checkbox' || role === 'radio') && !(props.isLocationSelected instanceof Function)) {
		console.warn('No isLocationSelected function provided.');
	}

	return (
		<svg className="taiwan-map" xmlns="http://www.w3.org/2000/svg" viewBox={svg.viewBox} role="group" aria-label={svg.label}>
		{
			svg.locations.map(location => {
				return (<path
						id={location.id}
						className="taiwan-map__location"
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

export default TaiwanMap;
