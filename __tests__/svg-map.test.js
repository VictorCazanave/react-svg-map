import React from 'react';
import renderer from 'react-test-renderer';
import FakeMap from './fake-map';
import { SVGMap } from '../src/';

describe('SVGMap component', () => {
	describe('Properties', () => {
		test('displays map with default props', () => {
			const component = renderer.create(<SVGMap map={FakeMap} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map with custom props', () => {
			const eventHandler = () => 'eventHandler';
			const isLocationSelected = () => 'isLocationSelected';
			const component = renderer.create(
				<SVGMap map={FakeMap}
					className="className"
					role="role"
					locationClassName="locationClassName"
					locationTabIndex="locationTabIndex"
					locationRole="locationRole"
					onLocationMouseOver={eventHandler}
					onLocationMouseOut={eventHandler}
					onLocationMouseMove={eventHandler}
					onLocationClick={eventHandler}
					onLocationKeyDown={eventHandler}
					onLocationFocus={eventHandler}
					onLocationBlur={eventHandler}
					isLocationSelected={isLocationSelected}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map with custom function location props', () => {
			const locationClassName = (location, index) => `locationClassName-${index}`;
			const locationTabIndex = (location, index) => `locationTabIndex-${index}`;
			const component = renderer.create(
				<SVGMap map={FakeMap}
					locationClassName={locationClassName}
					locationTabIndex={locationTabIndex}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
