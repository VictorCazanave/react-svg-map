import React from 'react';
import PropTypes from 'prop-types';

function SVGMap(props) {
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
						tabIndex={props.tabIndex}
						role={props.type}
						aria-label={location.name}
						aria-checked={props.isLocationSelected && props.isLocationSelected(location)}
						key={location.id} />);
				})
			}
		</svg>
	);
}

SVGMap.propTypes = {
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
	tabIndex: PropTypes.string,
	type: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func
};

SVGMap.defaultProps = {
	tabIndex: '0', // Focusable locations
	type: 'none'
};

export default SVGMap;
