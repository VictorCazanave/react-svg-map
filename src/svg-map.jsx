import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SVGMap = forwardRef((props, ref) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={props.map.viewBox}
			className={
				props.className ? props.className.concat(' ', 'svg-map') : 'svg-map'
			}
			ref={ref}
			role={props.role}
			aria-label={props.map.label}>
			{props.childrenBefore}
			{props.map.locations.map((location, index) => {
				return (
					<path
						aria-checked={
							props.isLocationSelected &&
							props.isLocationSelected(location, index)
						}
						aria-label={
							typeof props.locationAriaLabel === 'function'
								? props.locationAriaLabel(location, index)
								: location.name
						}
						// FIXME: what is the purpose of passing a locationClassName function?
						// It looks very atypical and confusing. To be reviewed?
						className={
							typeof props.locationClassName === 'function'
								? props.locationClassName(location, index)
								: props.locationClassName
						}
						d={location.path}
						data-testid={location.id}
						id={location.id}
						key={location.id}
						name={location.name}
						onBlur={props.onLocationBlur}
						onClick={props.onLocationClick}
						onFocus={props.onLocationFocus}
						onKeyDown={props.onLocationKeyDown}
						onMouseMove={props.onLocationMouseMove}
						onMouseOut={props.onLocationMouseOut}
						onMouseOver={props.onLocationMouseOver}
						role={props.locationRole}
						// FIXME: Passing a locationTabIndex function seems confusing and atypical.
						// Looks like a very contextual fix for an issue. To be reviewed?
						tabIndex={
							typeof props.locationTabIndex === 'function'
								? props.locationTabIndex(location, index)
								: props.locationTabIndex
						}
					/>
				);
			})}
			{props.childrenAfter}
		</svg>
	);
});

SVGMap.propTypes = {
	// Map properties
	map: PropTypes.shape({
		viewBox: PropTypes.string.isRequired,
		locations: PropTypes.arrayOf(
			PropTypes.shape({
				path: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired,
				name: PropTypes.string,
			})
		).isRequired,
		label: PropTypes.string,
	}).isRequired,
	className: PropTypes.string,
	role: PropTypes.string,

	// Locations properties
	locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationRole: PropTypes.string,
	locationAriaLabel: PropTypes.func,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationKeyDown: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func,

	// Slots
	childrenBefore: PropTypes.node,
	childrenAfter: PropTypes.node,
};

SVGMap.defaultProps = {
	role: 'none', // No role for map
	locationClassName: 'svg-map__location',
	locationTabIndex: '0',
	locationRole: 'none',
};

export default SVGMap;
