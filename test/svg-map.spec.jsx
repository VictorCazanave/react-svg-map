import React from 'react';
import renderer from 'react-test-renderer';
import SVGMap from '../src/svg-map';
import Taiwan from '../src/maps/taiwan';

test('SVGMap displays map of Taiwan with default props', () => {
	const component = renderer.create(<SVGMap map={Taiwan}/>);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Taiwan with custom props', () => {
	const isSelected = () => false;
	const component = renderer.create(<SVGMap map={Taiwan} type="checkbox" tabIndex="1" isLocationSelected={isSelected} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays custom map', () => {
	const customMap = {
		label: 'custom map',
		viewBox: 'custom view box',
		locations: [{
			name: 'custom name',
			id: 'custom id',
			path: 'custom path'
		}]
	};
	const component = renderer.create(<SVGMap map={customMap}/>);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
