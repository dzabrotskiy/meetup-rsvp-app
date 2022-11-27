import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import { UsersList } from '../UsersList';
import users from '../../../mock/users.json';

describe('UsersList', () => {
  it('should match snapshot', () => {
    const onUserPress = jest.fn();
    const tree = renderer
      .create(<UsersList users={users} onUserPress={onUserPress} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly', () => {
    const onUserPress = jest.fn();
    const tree = renderer
      .create(<UsersList users={users} onUserPress={onUserPress} />)
      .toJSON();

    expect(tree.children[0].props.data.length).toBe(users.length);
  });

  it('should called with correct user', async () => {
    const onUserPress = jest.fn();
    const { findAllByTestId } = render(
      <UsersList users={users} onUserPress={onUserPress} />
    );
    const testId = 'UserItem';
    const element = await findAllByTestId(testId);

    fireEvent.press(element[0]);

    expect(onUserPress).toBeCalledWith(users[0]);
  });
});
