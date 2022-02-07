import { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
	LocationActions,
	LocationAttributes,
	MapAttributes,
	MapType,
} from "./types";

const SVGMap = forwardRef((props, ref) => {
	const { isLocationSelected, map, type } = props;
	useEffect(() => {
		if (ref && ref.current) {
			if (type === "radio") {
				const selectedLocation = map.locations.find((location, index) =>
					isLocationSelected(location, index)
				);
				ref.current.value = selectedLocation;
			} else if (type === "checkbox") {
				const selectedLocations = map.locations.filter((location, index) =>
					isLocationSelected(location, index)
				);
				ref.current.value = selectedLocations;
			}
		}
	}, [isLocationSelected, map, ref, type]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={props.map.viewBox}
			className={
				props.className ? props.className.concat(" ", "svg-map") : "svg-map"
			}
			name={props.name}
			ref={ref}
			role={props.role}
			aria-label={props.map.label}
		>
			{props.childrenBefore}
			{props.map.locations.map((location, index) => {
				return (
					<path
						aria-checked={
							props.isLocationSelected &&
							props.isLocationSelected(location, index)
						}
						aria-label={
							typeof props.locationAriaLabel === "function"
								? props.locationAriaLabel(location, index)
								: location.name
						}
						// FIXME: what is the purpose of passing a locationClassName function?
						// It looks very atypical and confusing. To be reviewed?
						className={
							typeof props.locationClassName === "function"
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
							typeof props.locationTabIndex === "function"
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
	...LocationAttributes,
	// Locations properties
	locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationRole: PropTypes.string,
	locationAriaLabel: PropTypes.func,
	isLocationSelected: PropTypes.func,
	...LocationActions,
	onLocationClick: PropTypes.func,
	onLocationKeyDown: PropTypes.func,
	...MapAttributes,
	map: MapType.isRequired,
	name: PropTypes.string,
	role: PropTypes.string,
	type: PropTypes.oneOf(["checkbox", "radio"]),
};

SVGMap.defaultProps = {
	locationClassName: "svg-map__location",
	locationTabIndex: "0",
	locationRole: "none",
	role: "none", // No role for map
	type: "radio",
};

SVGMap.displayName = "SVGMap";
export default SVGMap;
