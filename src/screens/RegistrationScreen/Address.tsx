import { useController, useFormContext } from 'react-hook-form';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { TextField } from 'components/TextField';
import { Spacer } from 'components/Spacer';
import { Button } from 'components/Button';

import { RegistrationData, StepFormProps } from './types';
import { Steps } from './constants';

export function Address({ setStep, onSubmit }: StepFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationData>();

  const { field: address } = useController({
    control,
    name: 'address',
  });

  return (
    <Animated.View entering={FadeInUp}>
      <TextField
        {...address}
        label="Address *"
        multiline={true}
        maxLength={50}
        style={{ height: 70, textAlignVertical: 'top' }}
        status={errors.address && 'error'}
        description={errors.address?.message as string}
      />
      <Spacer height={30} />
      <Button
        type="secondary"
        title="Back"
        onPress={() => {
          setStep(Steps.AdditionalInfo);
        }}
      />
      <Spacer height={20} />
      <Button title="Submit Registration" onPress={onSubmit} />
    </Animated.View>
  );
}
