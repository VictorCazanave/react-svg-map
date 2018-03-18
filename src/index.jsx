import React from 'react';
import TaiwanMapLocations from './TaiwanMapLocations';
import './index.scss';

function TaiwanMap(props) {
	// Set default props
	const locations = props.locations || TaiwanMapLocations;
	const tabIndex = props.locationTabIndex || '0';
	const role = props.locationRole || 'button';

	return (
		<svg className="taiwan-map" xmlns="http://www.w3.org/2000/svg" viewBox="312 322 688 973" aria-label="Map of Taiwan">
		{
			locations.map(location =>
				(<path
					id={location.id}
					className="taiwan-map__location"
					name={location.name}
					d={location.path}
					onMouseOver={props.onLocationMouseOver}
					onMouseOut={props.onLocationMouseOut}
					onClick={props.onLocationClick}
					onFocus={props.onLocationFocus}
					onBlur={props.onLocationBlur}
					role={role}
					tabIndex={tabIndex}
					aria-label={location.name}
					aria-selected={props.isLocationSelected(location)}
					key={location.id} />
				)
			)
		}
	</svg>
	);
}

export default TaiwanMap;
