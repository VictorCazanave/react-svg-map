import { useState, useEffect, useRef, useCallback } from 'react';

export const useControlled = ({
  controlledValue,
  initialValue,
  name = 'SVG Map',
  onChange,
}) => {
  const isControlled = controlledValue !== undefined;
  const { current: origIsControlled } = useRef(isControlled);
  const [internalValue, setInternalValue] = useState(initialValue);
  const { current: origInitialValue } = useRef(initialValue);
  const value = origIsControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (origIsControlled !== isControlled) {
      console.warn(
        `"${name}" is changed from ${
          origIsControlled
            ? 'uncontrolled to controlled'
            : 'controlled to uncontrolled'
        }.`
      );
    }
  }, [origIsControlled, isControlled, name]);

  useEffect(() => {
    if (!origIsControlled && origInitialValue !== initialValue) {
      console.warn(
        `"${name}" is changing its defaultValue after being initialized. Make "${name}" a controlled component instead.`
      );
    }
  }, [origInitialValue, initialValue, name, origIsControlled]);

  useEffect(() => {
    if (typeof onChange === 'function' && controlledValue === undefined) {
      console.warn(
        '* Please provide a "value" prop to your controlled Map component'
      );
    } else if (typeof onChange === undefined && controlledValue !== undefined) {
      console.warn(
        '* Please provide an "onChange" function to your controlled Map component'
      );
    }
  }, [controlledValue, onChange]);

  const setValueIfUncontrolled = useCallback(
    newValue => {
      if (!origIsControlled) {
        setInternalValue(newValue);
      }
    },
    [origIsControlled]
  );

  return [value, setValueIfUncontrolled, { isControlled }];
};
