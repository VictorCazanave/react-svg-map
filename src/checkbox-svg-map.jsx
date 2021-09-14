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

const CheckboxSVGMap = forwardRef((props, ref) => {
  const [selectedLocations, setSelectedLocations, { isControlled }] =
    useControlled({
      controlledValue: props.value,
      initialValue: props.value ?? props.defaultValue,
      name: props.name,
      onChange: props.onChange,
    });
  const mapRef = useRef();

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

    if (isControlled) {
      const locationAttributes = getNodeAttributes(location);
      return props.onChange(locationAttributes);
    } else {
      setSelectedLocations(previousLocations => {
        // Copy old state
        let selectedLocations = [...previousLocations];

        if (location.attributes['aria-checked'].value === 'true') {
          // Delete location
          selectedLocations.splice(
            selectedLocations.findIndex(existingLocation =>
              existingLocation.isEqualNode(location)
            ),
            1
          );
        } else {
          // Add location
          selectedLocations.push(location);
        }

        // Return new state
        return selectedLocations;
      });
    }
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
      name={props.name}
      onLocationBlur={props.onLocationBlur}
      onLocationClick={handleLocationClick}
      onLocationFocus={props.onLocationFocus}
      onLocationKeyDown={handleLocationKeyDown}
      onLocationMouseMove={props.onLocationMouseMove}
      onLocationMouseOut={props.onLocationMouseOut}
      onLocationMouseOver={props.onLocationMouseOver}
      ref={ref ?? mapRef}
      role='group'
      type='checkbox'
    />
  );
});

CheckboxSVGMap.propTypes = {
  ...LocationAttributes,
  ...LocationActions,
  ...MapAttributes,
  defaultValue: PropTypes.arrayOf(LocationType),

  // SVGMap props
  map: MapType.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(LocationType),
};
CheckboxSVGMap.defaultProps = {
  defaultValue: [],
};

CheckboxSVGMap.displayName = 'CheckboxSVGMap';
export default CheckboxSVGMap;
