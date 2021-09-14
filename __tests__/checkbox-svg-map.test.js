import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import FakeMap from './fake-map';
import { CheckboxSVGMap } from '../src';
import { getNodeAttributes } from '../src/utils';

// TODO: Try to make it more readable
// TODO: Create utility functions to avoid code duplication
describe('CheckboxSVGMap component', () => {
  let wrapper;

  describe('Navigation', () => {
    const locationSelector = 'id0';

    let location;

    beforeEach(() => {
      wrapper = render(<CheckboxSVGMap map={FakeMap} />);
      location = screen.getByTestId(locationSelector);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe('Mouse', () => {
      test('selects location when clicking on not yet selected location', () => {
        expect(location).toHaveAttribute('aria-checked', 'false');

        userEvent.click(location);
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'true');
      });

      test('deselects location when clicking on already selected location', () => {
        userEvent.click(location);
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'true');

        userEvent.click(location);
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'false');
      });
    });

    describe('Keyboard', () => {
      test('selects focused location when hitting spacebar', () => {
        expect(location).toHaveAttribute('aria-checked', 'false');

        location.focus();
        userEvent.keyboard('{space}');
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'true');
      });

      test('does not select focused location when hitting other key', () => {
        expect(location).toHaveAttribute('aria-checked', 'false');

        location.focus();
        userEvent.keyboard('{Key0}');
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'false');
      });

      test('deselects focused already selected location when hitting spacebar', () => {
        location.focus();
        userEvent.keyboard('{space}');
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'true');

        location.focus();
        userEvent.keyboard('{space}');
        location = screen.getByTestId(locationSelector);

        expect(location).toHaveAttribute('aria-checked', 'false');
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
      wrapper = render(
        <CheckboxSVGMap
          map={FakeMap}
          onChange={handleOnChange}
          value={[{ id: 'id0' }, { id: 'id1' }, { id: 'invalid-id' }]}
        />,
        { attachTo: container }
      );
      selectedLocation = screen.getByTestId('id0');
      otherSelectedLocation = screen.getByTestId('id1');
      unselectedLocation = screen.getByTestId('id2');
    });

    afterEach(() => {
      wrapper.unmount();
      handleOnChange.mockClear();
    });

    test('selects initial locations when valid ids are provided', () => {
      expect(selectedLocation).toHaveAttribute('aria-checked', 'true');
      expect(otherSelectedLocation).toHaveAttribute('aria-checked', 'true');
      expect(unselectedLocation).toHaveAttribute('aria-checked', 'false');
    });

    test('calls onChange handler when selecting location', () => {
      userEvent.click(unselectedLocation);
      const unselectedLocationAttributes =
        getNodeAttributes(unselectedLocation);

      expect(handleOnChange).toHaveBeenCalledWith(unselectedLocationAttributes);
    });

    test('calls onChange handler when deselecting location', () => {
      userEvent.click(otherSelectedLocation);
      const otherSelectedLocationAttributes = getNodeAttributes(
        otherSelectedLocation
      );

      expect(handleOnChange).toHaveBeenCalledWith(
        otherSelectedLocationAttributes
      );
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
      const value = [];
      const component = renderer.create(
        <CheckboxSVGMap
          map={FakeMap}
          className='className'
          locationClassName='locationClassName'
          onLocationMouseOver={eventHandler}
          onLocationMouseOut={eventHandler}
          onLocationMouseMove={eventHandler}
          onLocationFocus={eventHandler}
          onLocationBlur={eventHandler}
          onChange={eventHandler}
          value={value}
          childrenBefore={<text>childrenBefore</text>}
          childrenAfter={<text>childrenAfter</text>}
        />
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
