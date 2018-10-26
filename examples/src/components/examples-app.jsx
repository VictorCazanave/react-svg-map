import React from 'react';
import CheckboxMap from './checkbox-map';
import RadioMap from './radio-map';
import LinkMap from './link-map';
import TooltipMap from './tooltip-map';
import CheckboxUtahMap from './checkbox-utah-map';
import './examples-app.scss';

class ExamplesApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="examples">
				<CheckboxUtahMap />
			</section>
		);
	}
}

export default ExamplesApp;
