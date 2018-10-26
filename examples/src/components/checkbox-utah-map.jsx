import React from 'react';
import { SVGMap, Utah } from '../../../src/';
import { getLocationName, getLocationSelected } from '../utils';
import '../../../src/svg-map.scss';

class CheckboxUtahMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocations: new Set(),
         tooltipStyle: {
            display: 'none'
         }
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.isLocationSelected = this.isLocationSelected.bind(this);
      this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
	}

   handleLocationMouseMove(event) {
      const tooltipStyle = {
         display: 'block',
         top: event.clientY + 10,
         left: event.clientX - 100
      };
      this.setState({ tooltipStyle });
   }

	handleLocationMouseOver(event) {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	}

	handleLocationMouseOut() {
      this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

	handleLocationClick(event) {
		const clickedLocation = getLocationName(event);
		const isSelected = getLocationSelected(event);

		this.setState(prevState => {
			let selectedLocations = new Set(prevState.selectedLocations);

			if (isSelected) {
				selectedLocations.delete(clickedLocation);
			} else {
				selectedLocations.add(clickedLocation);
			}

			return { ...prevState, selectedLocations };
		});
	}

	handleLocationFocus(event) {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	isLocationSelected(location) {
		return this.state.selectedLocations.has(location.name);
	}

	render() {
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					Utah County Map
				</h2>
				<div className="examples__block__info">
					<div className="examples__block__info__item">
						Pointed location: {this.state.pointedLocation}
					</div>
					<div className="examples__block__info__item">
						Focused location: {this.state.focusedLocation}
					</div>
					<div className="examples__block__info__item">
						Selected locations:
						<ul>
							{
								[...this.state.selectedLocations].map(location => (<li key={location}>{location}</li>))
							}
						</ul>
					</div>
				</div>
				<div className="examples__block__map">
					<SVGMap
						map={Utah}
						type="checkbox"
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationClick={this.handleLocationClick}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
                  onLocationMouseMove={this.handleLocationMouseMove}
						isLocationSelected={this.isLocationSelected} />
                  <div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
                     {this.state.pointedLocation}
                  </div>
				</div>
			</article>
		);
	}
}

export default CheckboxUtahMap;
