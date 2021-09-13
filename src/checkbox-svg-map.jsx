import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';

const CheckboxSVGMap = forwardRef((props, ref) => {
  // TODO: Store only ids instead of nodes?
  const [selectedLocations, setSelectedLocations] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    // Set initial selected locations
    if (props.selectedLocationIds) {
      const svgNode = ref?.current ?? mapRef.current;
      const foundLocations = props.selectedLocationIds
        .map(locationId => svgNode.getElementById(locationId))
        .filter(location => !!location); // Remove null locations when invalid id

      setSelectedLocations(foundLocations);
    }
  }, []);

  /**
   * Indicate whether a location is selected
   *
   * @param {Object} location - Location object
   * @returns {boolean} True if the location is selected
   */
  const isLocationSelected = location => {
    return selectedLocations.some(
      selectedLocation => selectedLocation.id === location.id
    );
  };

  /**
   * Select/deselect a location
   *
   * @param {Event} event - Triggered event
   */
  const toggleLocation = event => {
    const location = event.target;

    setSelectedLocations(previousLocations => {
      // Copy old state
      let selectedLocations = [...previousLocations];

      if (location.attributes['aria-checked'].value === 'true') {
        // Delete location
        selectedLocations.splice(selectedLocations.indexOf(location), 1);
      } else {
        // Add location
        selectedLocations.push(location);
      }

      // Call onChange event handler
      if (props.onChange) {
        props.onChange(selectedLocations);
      }

      // Return new state
      return selectedLocations;
    });
  };

  /**
   * Handle click on a location
   *
   * @param {Event} event - Triggered click event
   */
  const handleLocationClick = event => {
    event.preventDefault();
    toggleLocation(event);
  };

  /**
   * Handle spacebar down on a location
   *
   * @param {Event} event - Triggered keydown event
   */
  const handleLocationKeyDown = event => {
    // Spacebar
    if (event.keyCode === 32) {
      event.preventDefault();
      toggleLocation(event);
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
      locationRole='checkbox'
      locationTabIndex='0'
      map={props.map}
      onLocationBlur={props.onLocationBlur}
      onLocationClick={handleLocationClick}
      onLocationFocus={props.onLocationFocus}
      onLocationKeyDown={handleLocationKeyDown}
      onLocationMouseMove={props.onLocationMouseMove}
      onLocationMouseOut={props.onLocationMouseOut}
      onLocationMouseOver={props.onLocationMouseOver}
      ref={ref ?? mapRef}
      role='group'
    />
  );
});

CheckboxSVGMap.propTypes = {
  selectedLocationIds: PropTypes.arrayOf(PropTypes.string),
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

CheckboxSVGMap.displayName = 'CheckboxSVGMap';
export default CheckboxSVGMap;
