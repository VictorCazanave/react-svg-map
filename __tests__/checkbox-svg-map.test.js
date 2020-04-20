import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FakeMap from './fake-map';
import { CheckboxSVGMap } from '../src';

// TODO: Try to make it more readable
// TODO: Create utility functions to avoid code duplication
describe('CheckboxSVGMap component', () => {
	let wrapper;

	describe('Navigation', () => {
		const locationSelector = '#id0';

		let location;

		beforeEach(() => {
			wrapper = mount(<CheckboxSVGMap map={FakeMap} />);
			location = wrapper.find(locationSelector);
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

		describe('Keyboard', () => {
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
	});

	describe('Communication', () => {
		// Create element to attach component to it and avoid warnings when attached to document.body
		// https://stackoverflow.com/a/49025532/9826498
		const container = document.createElement('div');
		document.body.appendChild(container);

		const handleOnChange = jest.fn();

		let selectedLocation;
		let otherSelectedLocation;
		let unselectedLocation;

		beforeEach(() => {
			wrapper = mount(
				<CheckboxSVGMap
					map={FakeMap}
					selectedLocationIds={['id0', 'id1']}
					onChange={handleOnChange}
				/>,
				{ attachTo: container }
			);
			selectedLocation = wrapper.find('#id0');
			otherSelectedLocation = wrapper.find('#id1');
			unselectedLocation = wrapper.find('#id2');
		});

		afterEach(() => {
			wrapper.unmount();
			handleOnChange.mockClear();
		});

		test('selects initial locations when ids are provided', () => {
			expect(selectedLocation.props()['aria-checked']).toBeTruthy();
			expect(otherSelectedLocation.props()['aria-checked']).toBeTruthy();
			expect(unselectedLocation.props()['aria-checked']).toBeFalsy();
		});

		test('calls onChange handler when selecting location', () => {
			unselectedLocation.simulate('click');

			expect(handleOnChange).toHaveBeenCalledWith([
				selectedLocation.getDOMNode(),
				otherSelectedLocation.getDOMNode(),
				unselectedLocation.getDOMNode()
			]);
		});

		test('calls onChange handler when deselecting location', () => {
			otherSelectedLocation.simulate('click');

			expect(handleOnChange).toHaveBeenCalledWith([selectedLocation.getDOMNode()]);
		});
	});

	describe('Rendering', () => {
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
					childrenBefore={<text>childrenBefore</text>}
					childrenAfter={<text>childrenAfter</text>}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
