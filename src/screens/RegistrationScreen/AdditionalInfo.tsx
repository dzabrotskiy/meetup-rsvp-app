import { useCallback } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useController, useFormContext } from 'react-hook-form';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Spacer } from 'components/Spacer';
import { TextField } from 'components/TextField';
import { Field } from 'components/Field';
import { Button } from 'components/Button';

import { numberOfGuestsOptions, professionOptions, Steps } from './constants';
import { StepFormProps } from './types';

export function AdditionalInfo({ setStep }: StepFormProps) {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const { field: profession } = useController({
    control,
    name: 'profession',
  });

  const { field: locality } = useController({
    control,
    name: 'locality',
  });

  const { field: numberOfGuests } = useController({
    control,
    name: 'numberOfGuests',
  });

  const onNextStep = useCallback(() => {
    clearErrors();
    if (!locality.value) {
      setError('locality', {
        message: 'Enter locality',
      });
      return;
    }
    setStep(Steps.Address);
  }, [locality]);

  return (
    <Animated.View entering={FadeInUp}>
      <Field label="Profession">
        <SegmentedControl
          values={professionOptions}
          selectedIndex={professionOptions.indexOf(profession.value)}
          onChange={(event) => {
            profession.onChange(event.nativeEvent.value);
          }}
        />
      </Field>
      <Spacer height={20} />
      <TextField
        {...locality}
        label="Locality *"
        placeholder="Enter Locality"
        status={errors.locality && 'error'}
        description={errors.locality?.message as string}
      />
      <Spacer height={20} />
      <Field label="Number Of Guests">
        <SegmentedControl
          values={numberOfGuestsOptions}
          selectedIndex={numberOfGuestsOptions.indexOf(
            numberOfGuests.value.toString()
          )}
          onChange={(event) => numberOfGuests.onChange(event.nativeEvent.value)}
        />
      </Field>
      <Spacer height={30} />
      <Button
        type="secondary"
        title="Back"
        onPress={() => {
          setStep(Steps.CommonInfo);
        }}
      />
      <Spacer height={20} />
      <Button title={'Next'} onPress={onNextStep} />
    </Animated.View>
  );
}
