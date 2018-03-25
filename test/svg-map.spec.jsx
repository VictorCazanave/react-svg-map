import React from 'react';
import renderer from 'react-test-renderer';
import SVGMap from '../src/svg-map';
import Taiwan from '../src/maps/taiwan';

test('SVGMap displays map of Taiwan', () => {
	const component = renderer.create(<SVGMap map={Taiwan}/>);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
