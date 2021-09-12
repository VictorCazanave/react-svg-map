import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import FakeMap from './fake-map';
import { RadioSVGMap } from '../src';

// TODO: Try to make it more readable
// TODO: Create utility functions to avoid code duplication
describe('RadioSVGMap component', () => {
	const locationSelector = 'id1';
	const previousLocationSelector = 'id0';
	const nextLocationSelector = 'id2';

	let wrapper;
	let location;
	let previousLocation;
	let nextLocation;

	describe('Navigation', () => {
		beforeEach(() => {
			wrapper = render(<RadioSVGMap map={FakeMap} />);
			location =  screen.getByTestId(locationSelector);
			previousLocation = screen.getByTestId(previousLocationSelector);
			nextLocation = screen.getByTestId(nextLocationSelector);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		describe('Mouse', () => {
			it('selects location when clicking on not yet selected location', () => {
				expect(location.getAttribute('aria-checked')).toBe(null);

				userEvent.click(location);
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked');
			});

			it('does not deselect location when clicking on already selected location', () => {
				userEvent.click(location);
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');

				userEvent.click(location);
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');
			});

			it('selects new location and deselects former selected when clicking on new location', () => {
				userEvent.click(location);
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');
				expect(previousLocation).toHaveAttribute('aria-checked', 'false');
				
				userEvent.click(previousLocation);
				location = screen.getByTestId(locationSelector);
				previousLocation = screen.getByTestId(previousLocationSelector);

				expect(location).toHaveAttribute('aria-checked', 'false');
				expect(previousLocation).toHaveAttribute('aria-checked', 'true');
			});

			it('makes location focusable when selected', () => {
				expect(location).toHaveProperty('tabIndex', -1);
				
				userEvent.click(location);
				location = screen.getByTestId(locationSelector);
				
				expect(location).toHaveProperty('tabIndex', 0);
			});
		});

		describe('Keyboard', () => {
			it('selects focused not yet selected location when hitting spacebar', () => {
				expect(location.getAttribute('aria-checked')).toBe(null);

				location.focus();
				userEvent.keyboard('{space}');
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');
			});

			it('does not deselect focused already selected location when hitting spacebar', () => {
				location.focus();
				userEvent.keyboard('{space}');
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');

				location.focus();
				userEvent.keyboard('{space}');
				location = screen.getByTestId(locationSelector);

				expect(location).toHaveAttribute('aria-checked', 'true');
			});

			it('selects next/first location when hitting down/right arrow', () => {
				expect(location.getAttribute('aria-checked')).toBe(null);
				expect(nextLocation.getAttribute('aria-checked')).toBe(null);

				location.focus();
				userEvent.keyboard('{arrowright}');
				location = screen.getByTestId(locationSelector);
				nextLocation = screen.getByTestId(nextLocationSelector);

				expect(location).toHaveAttribute('aria-checked', 'false');
				expect(nextLocation).toHaveAttribute('aria-checked', 'true');
			});

			it('selects previous/last location when hitting up/left arrow', () => {
				expect(location.getAttribute('aria-checked')).toBe(null);

				location.focus();
				userEvent.keyboard('{arrowleft}');
				location = screen.getByTestId(locationSelector);
				previousLocation = screen.getByTestId(previousLocationSelector);

				expect(location).toHaveAttribute('aria-checked', 'false');
				expect(previousLocation).toHaveAttribute('aria-checked', 'true');
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
			wrapper = render(
				<RadioSVGMap
					map={FakeMap}
					selectedLocationId="id1"
					onChange={handleOnChange}
				/>,
				{ attachTo: container }
			);
			location = screen.getByTestId(locationSelector);
			nextLocation = screen.getByTestId(nextLocationSelector);
		});

		afterEach(() => {
			wrapper.unmount();
			handleOnChange.mockClear();
		});

		it('selects initial location when id is provided', () => {
			expect(location).toHaveAttribute('aria-checked', 'true');
		});

		it('calls onChange handler when selecting location', () => {
			userEvent.click(nextLocation);

			expect(handleOnChange).toHaveBeenCalledWith(nextLocation);
		});

		it('does not call onChange handler when clicking on already selected location', () => {
			userEvent.click(location);

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

		it('displays map with default props', () => {
			const component = renderer.create(<RadioSVGMap map={FakeMap} />);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});

		it('displays map with custom props', () => {
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
					childrenBefore={<text>childrenBefore</text>}
					childrenAfter={<text>childrenAfter</text>}
				/>
			);
			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
