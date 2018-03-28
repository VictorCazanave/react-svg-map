import React from 'react';
import CheckboxMap from './checkbox-map';
import RadioMap from './radio-map';
import LinkMap from './link-map';
import './examples-app.scss';

class ExamplesApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="examples">
				<h1 className="examples__title">
					Examples of <a href="https://www.npmjs.com/package/react-svg-map">react-svg-map</a>
				</h1>
				<RadioMap />
				<CheckboxMap />
				<LinkMap />
			</section>
		);
	}
}

export default ExamplesApp;
