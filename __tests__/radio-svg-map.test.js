import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FakeMap from './fake-map';
import { RadioSVGMap } from '../src';

jest.mock('react-dom', () => ({
	findDOMNode: () => ({
		querySelectorAll: jest.fn(),
	})
}));

// TODO: Create utility functions to avoid code duplication
describe('RadioSVGMap component', () => {
	const locationSelector = '#id1';
	const previousLocationSelector = '#id0';
	const nextLocationSelector = '#id2';
	const handleOnChange = jest.fn();
	let wrapper = null;
	let location = null;
	let previousLocation = null;
	let nextLocation = null;

	beforeEach(() => {
		wrapper = mount(<RadioSVGMap map={FakeMap} onChange={handleOnChange} />);
		location = wrapper.find(locationSelector);
		previousLocation = wrapper.find(previousLocationSelector);
		nextLocation = wrapper.find(nextLocationSelector);
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

		test('does not deselect location when clicking on already selected location', () => {
			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();

			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('selects new location and deselects former selected when clicking on new location', () => {
			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
			expect(previousLocation.props()['aria-checked']).toBeFalsy();

			previousLocation.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);
			previousLocation = wrapper.find(previousLocationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
			expect(previousLocation.props()['aria-checked']).toBeTruthy();
		});

		test('makes location focusable when selected', () => {
			expect(location.props()['tabIndex']).toEqual('-1');

			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['tabIndex']).toEqual('0');
		});
	});

	describe('Keyboard navigation', () => {
		test('selects focused not yet selected location when hitting spacebar', () => {
			expect(location.props()['aria-checked']).toBeFalsy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('does not deselect focused already selected location when hitting spacebar', () => {
			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 32 });
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('selects next/first location when hitting down/right arrow', () => {
			expect(location.props()['aria-checked']).toBeFalsy();
			expect(nextLocation.props()['aria-checked']).toBeFalsy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 39 });
			wrapper.update();
			location = wrapper.find(locationSelector);
			nextLocation = wrapper.find(nextLocationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
			expect(nextLocation.props()['aria-checked']).toBeTruthy();
		});

		test('selects previous/last location when hitting up/left arrow', () => {
			expect(location.props()['aria-checked']).toBeFalsy();
			expect(previousLocation.props()['aria-checked']).toBeFalsy();

			location.simulate('focus');
			location.simulate('keydown', { keyCode: 37 });
			wrapper.update();
			location = wrapper.find(locationSelector);
			previousLocation = wrapper.find(previousLocationSelector);

			expect(location.props()['aria-checked']).toBeFalsy();
			expect(previousLocation.props()['aria-checked']).toBeTruthy();
		});
	});

	describe('Communication', () => {
		test('calls onChange handler when selecting location', () => {
			location.simulate('click');

			expect(handleOnChange).toHaveBeenCalledWith(location.getDOMNode());
		});
	});

	describe('Properties', () => {
		test('displays map with default props', () => {
			const component = renderer.create(<RadioSVGMap map={FakeMap} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		test('displays map with custom props', () => {
			const eventHandler = () => 'eventHandler';
			const component = renderer.create(
				<RadioSVGMap map={FakeMap}
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
