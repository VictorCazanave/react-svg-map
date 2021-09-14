import PropTypes from 'prop-types';

export const MapType = PropTypes.shape({
  viewBox: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
});

export const LocationActions = {
  onLocationMouseOver: PropTypes.func,
  onLocationMouseOut: PropTypes.func,
  onLocationMouseMove: PropTypes.func,
  onLocationFocus: PropTypes.func,
  onLocationBlur: PropTypes.func,
};

export const LocationAttributes = {
  locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  locationAriaLabel: PropTypes.func,
};

export const MapAttributes = {
  childrenBefore: PropTypes.node,
  childrenAfter: PropTypes.node,
  className: PropTypes.string,
};

export const LocationType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
});
