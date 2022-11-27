import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import mockAxios from 'jest-mock-axios';

import { RegistrationScreen } from '../RegistrationScreen';
import { register } from '../../../api/register';

jest.mock('axios')

describe('Registration', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should renders correctly', () => {
    const { getByText } = render(
      <RegistrationScreen />
    );
    expect(getByText('Name *')).toBeDefined()
    expect(getByText('Age *')).toBeDefined()
    expect(getByText('Date of Birth *')).toBeDefined()
    expect(getByText('Next')).toBeDefined()
  })

  it('should go to the second step', async () => {
    const { getByText, getByPlaceholderText } = render(
      <RegistrationScreen />
    );
    const name = getByPlaceholderText('Enter Name');
    const age = getByPlaceholderText('Enter Age');
    const nextButton = getByText('Next');

    fireEvent.changeText(name, 'Name')
    fireEvent.changeText(age, 22)
    fireEvent.press(nextButton)

    await waitFor(() => {
      expect(getByText('Profession')).toBeDefined()
      expect(getByText('Locality *')).toBeDefined()
      expect(getByText('Number Of Guests')).toBeDefined()
      expect(getByText('Back')).toBeDefined()
      expect(getByText('Next')).toBeDefined()
    })
  })

  it('should steps work correctly', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <RegistrationScreen />
    );
    const name = getByPlaceholderText('Enter Name');
    const age = getByPlaceholderText('Enter Age');
    const nextButton = getByText('Next');

    const user = {
      name: 'Name',
      age: 22,
      dateOfBirth: new Date(),
      profession: 'Employed',
      locality: 'Locality',
      numberOfGuests: 2,
      address: 'Address',
    }

    fireEvent.changeText(name, user.name)
    fireEvent.changeText(age, user.age)
    fireEvent.press(nextButton)

    await waitFor(() => {
      const locality = getByPlaceholderText('Enter Locality');
      const nextButton = getByText('Next');
      fireEvent.changeText(locality, user.locality);
      fireEvent.press(nextButton);
    })

    const address = await findByText('Address *');
    const submitButton = await findByText('Submit Registration');

    fireEvent.changeText(address, user.address);

    await waitFor(() => {
      expect(submitButton).toBeDefined()
    })

  })

  it('should call correct api endpoint', async () => {
    const user = {
      name: 'Name',
      age: 22,
      dateOfBirth: new Date(),
      profession: 'Employed',
      locality: 'Locality',
      numberOfGuests: 2,
      address: 'Address',
    }
    register(user)

    await waitFor(() => {
      expect(mockAxios.post).toBeCalledWith('/api/register', user)
    })
  })
})
