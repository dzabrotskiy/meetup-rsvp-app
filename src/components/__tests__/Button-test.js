import * as React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { Text } from '../Themed';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button title="Press Me" onPress={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = renderer.create(<Button title="Press Me" onPress={onPress} />);
  const button = tree.root.findByType(TouchableOpacity);

  button.props.onPress();

  expect(onPress).toBeCalled();
});

it('should be correct button title', () => {
  const onPress = jest.fn();
  const title = 'Press Me';
  const tree = renderer.create(<Button title={title} onPress={onPress} />);
  const text = tree.root.findByType(Text);

  expect(text.props.children).toBe(title);
});

it('should be primary by default', () => {
  const onPress = jest.fn();
  const title = 'Press Me';
  const tree = renderer
    .create(<Button title={title} onPress={onPress} />)
    .toJSON();

  expect(tree.props.style).toStrictEqual({
    width: '100%',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5800ff',
    borderRadius: 11,
    opacity: 1,
  });
});

it('should be correct secondary styles', () => {
  const onPress = jest.fn();
  const title = 'Press Me';
  const tree = renderer
    .create(<Button title={title} onPress={onPress} type="secondary" />)
    .toJSON();

  expect(tree.props.style).toStrictEqual({
    width: '100%',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 11,
    opacity: 1,
    borderColor: '#5800ff',
    borderWidth: 1,
  });
});
