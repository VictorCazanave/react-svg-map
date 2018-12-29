import React from 'react';
import PropTypes from 'prop-types';

class SVGMap extends React.Component {
	constructor(props) {
		super(props);

		this.svg = null;
		this.paths = null;

		// Select <svg> and <path> nodes
		this.setNodes = element => {
			this.svg = element.querySelector('svg');
			this.paths = element.querySelectorAll('path');
		};
	}

	componentDidMount() {
		// Add CSS class and aria role
		this.svg.setAttribute('class', this.props.className);
		this.svg.setAttribute('role', this.props.role);

		for (let i = 0; i < this.paths.length; i++) {
			const path = this.paths[i];
			const name = path.getAttribute('name');

			// Add event listeners
			path.addEventListener('mouseover', this.props.onLocationMouseOver);
			path.addEventListener('mouseout', this.props.onLocationMouseOut);
			path.addEventListener('mousemove', this.props.onLocationMouseMove);
			path.addEventListener('click', this.props.onLocationClick);
			path.addEventListener('keydown', this.props.onLocationKeyDown);
			path.addEventListener('focus', this.props.onLocationFocus);
			path.addEventListener('blur', this.props.onLocationBlur);

			// Add attributes
			path.setAttribute('tabindex', this.props.locationTabIndex);
			path.setAttribute('role', this.props.locationRole);
			path.setAttribute('aria-label', name);

			// Add aria-checked attribute when needed
			if (this.props.isLocationSelected) {
				path.setAttribute('aria-checked', this.props.isLocationSelected(path));
			}
		}
	}

	componentDidUpdate() {
		// Update aria-checked when needed
		if (this.props.isLocationSelected) {
			for (let i = 0; i < this.paths.length; i++) {
				const path = this.paths[i];

				path.setAttribute('aria-checked', this.props.isLocationSelected(path));
			}
		}
	}

	componentWillUnmount() {
		for (let i = 0; i < this.paths.length; i++) {
			const path = this.paths[i];

			// Remove event listeners
			path.removeEventListener('mouseover');
			path.removeEventListener('mouseout');
			path.removeEventListener('mousemove');
			path.removeEventListener('click');
			path.removeEventListener('keydown');
			path.removeEventListener('focus');
			path.removeEventListener('blur');
		}
	}

	render() {
		return (
			<div
				className="svg-map-wrapper"
				dangerouslySetInnerHTML={{ __html: this.props.map }}
				ref={this.setNodes}
			/>
		);
	}
}

SVGMap.propTypes = {
	map: PropTypes.node.isRequired,
	className: PropTypes.string,
	role: PropTypes.string,
	locationTabIndex: PropTypes.string,
	locationRole: PropTypes.string,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationKeyDown: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func
};

SVGMap.defaultProps = {
	className: 'svg-map',
	role: 'none', // No role for map
	locationTabIndex: '0', // Focusable locations
	locationRole: 'none', // No role for locations
};

export default SVGMap;
