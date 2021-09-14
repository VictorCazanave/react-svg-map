import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import SVGMap from './svg-map';
import { useControlled } from './useControlled';
import {
  LocationActions,
  LocationAttributes,
  LocationType,
  MapAttributes,
  MapType,
} from './types';
import { getNodeAttributes } from './utils';

const RadioSVGMap = forwardRef((props, ref) => {
  const [selectedLocation, setSelectedLocation, { isControlled }] =
    useControlled({
      controlledValue: props.value,
      initialValue: props.value ?? props.defaultValue,
      name: props.name,
      onChange: props.onChange,
    });
  const locationsRef = useRef([]);
  const mapRef = useRef();

  /**
   * Get location tabindex value
   *
   * @param {Object} location - Location object
   * @param {number} index - Index of location
   * @returns {string} Value of tabindex HTML attribute
   */
  const getLocationTabIndex = (location, index) => {
    let tabIndex = null;

    if (selectedLocation) {
      // Only selected location is focusable
      tabIndex = isLocationSelected(location) ? '0' : '-1';
    } else {
      // Only first location is focusable
      tabIndex = index === 0 ? '0' : '-1';
    }

    return tabIndex;
  };

  /**
   * Indicate whether a location is selected
   *
   * @param {Object} location - Location object
   * @returns {boolean} True if the location is selected
   */
  const isLocationSelected = location => {
    return selectedLocation && selectedLocation.id === location.id;
  };

  /**
   * Select a location
   *
   * @param {Node} location - Location DOM node
   */
  const selectLocation = location => {
    // Focus new selected location
    location.focus();
    const newLocationAttributes = getNodeAttributes(location);
    if (isControlled) {
      // Call onChange event handler
      props.onChange(newLocationAttributes);
    } else {
      // Change selected location
      setSelectedLocation(newLocationAttributes);
    }
  };

  /**
   * Handle click on a location
   *
   * @param {Event} event - Triggered click event
   */
  const handleLocationClick = event => {
    const clickedLocation = event.target;

    // Select clicked location if not already selected
    if (selectedLocation?.id !== clickedLocation.attributes.id.value) {
      selectLocation(clickedLocation);
    }
  };

  /**
   * Handle spacebar and arrows down on a location
   *
   * @param {Event} event - Triggered keydown event
   */
  const handleLocationKeyDown = event => {
    const focusedLocation = event.target;

    // Spacebar
    if (event.keyCode === 32) {
      event.preventDefault();

      // Select focused location if not already selected
      if (focusedLocation !== selectedLocation) {
        selectLocation(focusedLocation);
      }

      // Arrow down or right
    } else if (event.keyCode === 39 || event.keyCode === 40) {
      event.preventDefault();

      // Select next or first location
      selectLocation(focusedLocation.nextSibling || locationsRef.current[0]);

      // Arrow up or left
    } else if (event.keyCode === 37 || event.keyCode === 38) {
      event.preventDefault();

      // Select previous or last location
      selectLocation(
        focusedLocation.previousSibling ||
          locationsRef.current[locationsRef.current.length - 1]
      );
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
      locationRole='radio'
      locationTabIndex={getLocationTabIndex}
      map={props.map}
      name={props.name}
      onChange={props.onChange}
      onLocationBlur={props.onLocationBlur}
      onLocationClick={handleLocationClick}
      onLocationFocus={props.onLocationFocus}
      onLocationKeyDown={handleLocationKeyDown}
      onLocationMouseMove={props.onLocationMouseMove}
      onLocationMouseOut={props.onLocationMouseOut}
      onLocationMouseOver={props.onLocationMouseOver}
      ref={ref ?? mapRef}
      role='radiogroup'
      type='radio'
    />
  );
});

RadioSVGMap.propTypes = {
  ...LocationActions,
  ...LocationAttributes,
  ...MapAttributes,

  defaultValue: LocationType,
  // SVGMap props
  map: MapType.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: LocationType,
};
RadioSVGMap.defaultProps = {
  defaultValue: null,
};

RadioSVGMap.displayName = 'RadioSVGMap';
export default RadioSVGMap;
