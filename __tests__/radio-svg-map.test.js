import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FakeMap from './fake-map';
import { RadioSVGMap } from '../src';

// TODO: Try to make it more readable
// TODO: Create utility functions to avoid code duplication
describe('RadioSVGMap component', () => {
	const locationSelector = '#id1';
	const previousLocationSelector = '#id0';
	const nextLocationSelector = '#id2';

	let wrapper;
	let location;
	let previousLocation;
	let nextLocation;

	describe('Navigation', () => {
		beforeEach(() => {
			wrapper = mount(<RadioSVGMap map={FakeMap} />);
			location = wrapper.find(locationSelector);
			previousLocation = wrapper.find(previousLocationSelector);
			nextLocation = wrapper.find(nextLocationSelector);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		describe('Mouse', () => {
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

		describe('Keyboard', () => {
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
	});

	describe('Communication', () => {
		// Create element to attach component to it and avoid warnings when attached to document.body
		// https://stackoverflow.com/a/49025532/9826498
		const container = document.createElement('div');
		document.body.appendChild(container);

		const handleOnChange = jest.fn();

		beforeEach(() => {
			wrapper = mount(
				<RadioSVGMap
					map={FakeMap}
					selectedLocationId="id1"
					onChange={handleOnChange}
				/>,
				{ attachTo: container }
			);
			location = wrapper.find(locationSelector);
			nextLocation = wrapper.find(nextLocationSelector);
		});

		afterEach(() => {
			wrapper.unmount();
			handleOnChange.mockClear();
		});

		test('selects initial location when id is provided', () => {
			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('calls onChange handler when selecting location', () => {
			nextLocation.simulate('click');

			expect(handleOnChange).toHaveBeenCalledWith(nextLocation.getDOMNode());
		});

		test('does not call onChange handler when clicking on already selected location', () => {
			location.simulate('click');

			expect(handleOnChange).toHaveBeenCalledTimes(0);
		});
	});

	describe('Rendering', () => {
		beforeAll(() => {
			// Mock ReactDOM to avoid error
			ReactDOM.findDOMNode = jest.fn(
				() => ({
					getElementsByTagName: jest.fn(() => ([]))
				})
			);
		});

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
