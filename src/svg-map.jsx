import React from 'react';
import PropTypes from 'prop-types';

function SVGMap(props) {

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={props.map.viewBox}
			className={props.className}
			role={props.role}
			aria-label={props.map.label}
		>
			{props.map.locations.map((location, index) => {
				return (
					<path
						id={location.id}
						name={location.name}
						d={location.path}
						className={getLocationClassName(props,location,index)}
						tabIndex={typeof props.locationTabIndex === 'function' ? props.locationTabIndex(location, index) : props.locationTabIndex || props.tabIndex}
						role={props.locationRole || props.type}
						aria-label={location.name}
						aria-checked={props.isLocationSelected && props.isLocationSelected(location, index)}
						onMouseOver={props.onLocationMouseOver}
						onMouseOut={props.onLocationMouseOut}
						onMouseMove={props.onLocationMouseMove}
						onClick={props.onLocationClick}
						onKeyDown={props.onLocationKeyDown}
						onFocus={props.onLocationFocus}
						onBlur={props.onLocationBlur}
						key={location.id}
					/>
				);
			})}
		</svg>
	);
}
function getLocationClassName(props,location,index) {
	let result='';
	if(props.locationClassName){
		result=props.locationClassName;
	}
	if(props.handleLocationClasses && typeof props.handleLocationClasses==='function'){
		let classes=props.handleLocationClasses(location,index);
		if(classes){
			result=result+' '+classes;
		}
	}
	return result;
}
SVGMap.propTypes = {
	// Map properties
	map: PropTypes.shape({
		viewBox: PropTypes.string.isRequired,
		locations: PropTypes.arrayOf(
			PropTypes.shape({
				path: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired,
				name: PropTypes.string
			})
		).isRequired,
		label: PropTypes.string
	}).isRequired,
	className: PropTypes.string,
	role: PropTypes.string,

	// Locations properties
	locationClassName: PropTypes.string,
	locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationRole: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationKeyDown: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func,
	handleLocationClasses: PropTypes.func,

	// Deprecated properties
	tabIndex: PropTypes.string,
	type: PropTypes.string
};

SVGMap.defaultProps = {
	className: 'svg-map',
	role: 'none', // No role for map
	locationClassName: 'svg-map__location',
	tabIndex: '0',  // Focusable locations (also used for locationTabIndex)
	type: 'none', // No role for locations (also used for locationRole)
};

export default SVGMap;
