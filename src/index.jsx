import React from 'react';
import TaiwanMapLocations from './TaiwanMapLocations';
import './index.scss';

function TaiwanMap(props) {
	// Set default props
	const locations = props.locations || TaiwanMapLocations;
	const role = props.role || 'button';
	const tabIndex = props.tabIndex || '0';

	return (
		<svg className="taiwan-map" xmlns="http://www.w3.org/2000/svg" viewBox="312 322 688 973" aria-label="Map of Taiwan">
		{
			locations.map(location =>
				(<path
					id={location.id}
					className="taiwan-map__location"
					name={location.name}
					d={location.path}
					onMouseOver={props.onLocationOver}
					onMouseOut={props.onLocationO}
					onClick={props.onLocationClick}
					tabIndex={tabIndex}
					role={role}
					aria-label={location.name}
					key={location.id} />
				)
			)
		}
	</svg>
	);
}

export default TaiwanMap;
