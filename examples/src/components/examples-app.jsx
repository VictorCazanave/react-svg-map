import { PureComponent } from "react";
import CheckboxMap from "./checkbox-map";
import RadioMap from "./radio-map";
import LinkMap from "./link-map";
import TooltipHeatMap from "./tooltip-heat-map";
import "../../../src/svg-map.scss";
import "./examples-app.scss";

class ExamplesApp extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="examples">
				<h1 className="examples__title">
					Examples of{" "}
					<a href="https://www.npmjs.com/package/react-svg-map">
						react-svg-map
					</a>
				</h1>
				<RadioMap />
				<CheckboxMap />
				<LinkMap />
				<TooltipHeatMap />
			</section>
		);
	}
}

export default ExamplesApp;
