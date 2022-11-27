import renderer from 'react-test-renderer';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'

import { TextField } from '../TextField';

describe('TextField', () => {
  it('should match snapshot', () => {
    const tree = renderer
      .create(<TextField value="value" onChange={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField value="" onChange={onChange} placeholder="Placeholder" />
    );

    const textInput = getByPlaceholderText('Placeholder');
    fireEvent.changeText(textInput, 'text');

    expect(onChange).toBeCalledWith('text');
  });

  it('should have correct label', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TextField
        value=""
        onChange={onChange}
        placeholder="Placeholder"
        label="Label"
      />
    );

    expect(getByText('Label')).toBeDefined();
  });

  it('should render error state', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField
        value=""
        onChange={onChange}
        placeholder="Placeholder"
        label="Label"
        status="error"
      />
    );

    const textInput = getByPlaceholderText('Placeholder');

    expect(textInput).toHaveStyle({
      borderWidth: 1,
      borderColor: '#f00'
    })
  })
});
