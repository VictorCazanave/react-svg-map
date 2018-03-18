import React from 'react';
import TaiwanMap from '../src/';
import './ExampleApp.scss';

class ExampleApp extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {

		return (
			<section className="example">
				<h1 className="example__title">Example of react-taiwan-map use</h1>
				<div className="example__map">
					<TaiwanMap />
				</div>
			</section>
		);
	}
}

export default ExampleApp;
