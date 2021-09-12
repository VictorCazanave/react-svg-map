import React from 'react';
import Taiwan from '@svg-maps/taiwan.main';
import { CheckboxSVGMap } from '../../../src/';
import { getLocationName } from '../utils';

class CheckboxMap extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocations: []
		};
	}

	handleLocationMouseOver = (event) => {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	}

	handleLocationMouseOut = () => {
		this.setState({ pointedLocation: null });
	}

	handleLocationFocus = (event) => {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur = () => {
		this.setState({ focusedLocation: null });
	}

	handleOnChange = (selectedNodes) => {
		this.setState(prevState => {
			return {
				...prevState,
				selectedLocations: selectedNodes.map(node => node.attributes.name.value)
			};
		});
	}

	render() {
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					Taiwan SVG map as checkboxes
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
					<CheckboxSVGMap
						map={Taiwan}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						onChange={this.handleOnChange} />
				</div>
			</article>
		);
	}
}

export default CheckboxMap;
