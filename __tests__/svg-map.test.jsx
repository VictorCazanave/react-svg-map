import React from 'react';
import renderer from 'react-test-renderer';
import { SVGMap, Australia, France, Taiwan, USA, Utah } from '../src/';

test('SVGMap displays map of Australia with default props', () => {
	const component = renderer.create(<SVGMap map={Australia} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Australia with custom props', () => {
	const isSelected = () => false;
	const component = renderer.create(<SVGMap map={Australia} type="radio" tabIndex="1" isLocationSelected={isSelected} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of France with default props', () => {
	const component = renderer.create(<SVGMap map={France} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of France with custom props', () => {
	const component = renderer.create(<SVGMap map={France} type="link" tabIndex="2" />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Taiwan with default props', () => {
	const component = renderer.create(<SVGMap map={Taiwan} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Taiwan with custom props', () => {
	const isSelected = () => true;
	const component = renderer.create(<SVGMap map={Taiwan} type="checkbox" tabIndex="3" isLocationSelected={isSelected} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of USA with default props', () => {
	const component = renderer.create(<SVGMap map={USA} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Taiwan with custom props', () => {
	const handleLocationMouseMove = () => false;
	const component = renderer.create(<SVGMap map={USA} tabIndex="4" onLocationMouseMove={handleLocationMouseMove} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Utah with default props', () => {
	const component = renderer.create(<SVGMap map={Utah} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('SVGMap displays map of Utah with custom props', () => {
	const isSelected = () => false;
	const component = renderer.create(<SVGMap map={Utah} type="radio" tabIndex="1" isLocationSelected={isSelected} />);
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
	const component = renderer.create(<SVGMap map={customMap} />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
