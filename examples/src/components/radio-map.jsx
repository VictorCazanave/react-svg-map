import { PureComponent } from "react";
import Australia from "@svg-maps/australia";
import { RadioSVGMap } from "../../../src/";
import { getLocationName } from "../utils";

class RadioMap extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocation: null,
		};
	}

	handleLocationMouseOver = event => {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	};

	handleLocationMouseOut = () => {
		this.setState({ pointedLocation: null });
	};

	handleLocationFocus = event => {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	};

	handleLocationBlur = () => {
		this.setState({ focusedLocation: null });
	};

	handleOnChange = newLocation => {
		this.setState({
			selectedLocation: newLocation,
		});
	};

	render() {
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					Australia SVG map as radio buttons
				</h2>
				<div className="examples__block__info">
					<div className="examples__block__info__item">
						Pointed location: {this.state.pointedLocation}
					</div>
					<div className="examples__block__info__item">
						Focused location: {this.state.focusedLocation}
					</div>
					<div className="examples__block__info__item">
						Selected location: {this.state.selectedLocation?.name}
					</div>
				</div>
				<div className="examples__block__map examples__block__map--australia">
					<RadioSVGMap
						map={Australia}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						ref={this.mapRef}
						onChange={this.handleOnChange}
						value={this.state.selectedLocation}
					/>
				</div>
			</article>
		);
	}
}

export default RadioMap;
