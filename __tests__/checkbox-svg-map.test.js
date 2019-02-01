import React from 'react';
import { mount } from 'enzyme';
import { CheckboxSVGMap, Australia } from '../src';

// TODO: Create utility functions to avoid code duplication
describe('CheckboxSVGMap component', () => {
	const locationSelector = '#nsw';
	const handleOnChange = jest.fn();
	let wrapper = null;
	let location = null;

	beforeEach(() => {
		wrapper = mount(<CheckboxSVGMap map={Australia} onChange={handleOnChange} />);
		location = wrapper.find(locationSelector);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	describe('Mouse navigation', () => {
		test('selects clicked location when not selected yet', () => {
			expect(location.props()['aria-checked']).toBeFalsy();

			location.simulate('click');
			wrapper.update();
			location = wrapper.find(locationSelector);

			expect(location.props()['aria-checked']).toBeTruthy();
		});

		test('deselects clicked location when already selected', () => {
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

		test('deselects clicked location when already selected', () => {
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
});