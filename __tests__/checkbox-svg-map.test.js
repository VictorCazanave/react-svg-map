import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FakeMap from './fake-map';
import { CheckboxSVGMap } from '../src';

// TODO: Create utility functions to avoid code duplication
describe('CheckboxSVGMap component', () => {
	const locationSelector = '#id0';
	const handleOnChange = jest.fn();
	let wrapper = null;
	let location = null;

	beforeEach(() => {
		wrapper = mount(<CheckboxSVGMap map={FakeMap} onChange={handleOnChange} />);
		location = wrapper.find(locationSelector);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	describe('Mouse navigation', () => {
		test('selects location when clicking on not yet selected location', () => {
			expect(location.props()['aria-checked']).toBeFalsy();

			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('deselects location when clicking on already selected location', () => {
			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();

			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
		});
	});

	describe('Keyboard navigation', () => {
		test('selects focused location when hitting spacebar', () => {
			expect(location.props()['aria-checked']).toBeFalsy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('does not select focused location when hitting other key', () => {
			expect(location.props()['aria-checked']).toBeFalsy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 31 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
		});

		test('deselects focused already selected location when hitting spacebar', () => {
			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
		});
	});

	describe('Communication', () => {
		test('calls onChange handler when selecting location', () => {
			location.simulate('click');

			expect(handleOnChange).toHaveBeenCalledWith([location.getDOMNode()]);
		});
	});

	describe('Properties', () => {
		test('displays map with default props', () => {
			const component = renderer.create(<CheckboxSVGMap map={FakeMap} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map with custom props', () => {
			const eventHandler = () => 'eventHandler';
			const component = renderer.create(
				<CheckboxSVGMap map={FakeMap}
					className="className"
					locationClassName="locationClassName"
					onLocationMouseOver={eventHandler}
					onLocationMouseOut={eventHandler}
					onLocationMouseMove={eventHandler}
					onLocationFocus={eventHandler}
					onLocationBlur={eventHandler}
					onChange={eventHandler}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
