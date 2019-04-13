import React from 'react';
import renderer from 'react-test-renderer';
import { SVGMap, Australia, France, Taiwan, USA, Utah } from '../src/';

describe('SVGMap component', () => {
	describe('Properties', () => {
		const map = {
			label: 'label',
			viewBox: 'viewBox',
			locations: [{
				name: 'name0',
				id: 'id0',
				path: 'path0'
			},
			{
				name: 'name1',
				id: 'id1',
				path: 'path1'
			}]
		};

		test('displays map with default props', () => {
			const component = renderer.create(<SVGMap map={map} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map with custom props', () => {
			const eventHandler = () => 'eventHandler';
			const isLocationSelected = () => 'isLocationSelected';
			const component = renderer.create(
				<SVGMap map={map}
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
				<SVGMap map={map}
					locationClassName={locationClassName}
					locationTabIndex={locationTabIndex}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});

	describe('Maps', () => {
		test('displays map of Australia', () => {
			const component = renderer.create(<SVGMap map={Australia} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map of France', () => {
			const component = renderer.create(<SVGMap map={France} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map of Taiwan', () => {
			const component = renderer.create(<SVGMap map={Taiwan} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map of USA', () => {
			const component = renderer.create(<SVGMap map={USA} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map of Utah', () => {
			const component = renderer.create(<SVGMap map={Utah} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
