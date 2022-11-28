import { useController, useFormContext } from 'react-hook-form';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as yup from 'yup';
import { useCallback } from 'react';
import { Platform } from 'react-native';

import { TextField } from 'components/TextField';
import { Spacer } from 'components/Spacer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';

import { RegistrationData, StepFormProps } from './types';
import { Steps } from './constants';

const commonInfoSchema = yup.object({
  name: yup.string().required('Enter name'),
  age: yup.number().integer('Enter age').required('Enter age'),
  dateOfBirth: yup.date().required(),
});

export function CommonInfo({ setStep }: StepFormProps) {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<RegistrationData>();

  const { field: name } = useController({
    control,
    name: 'name',
  });

  const { field: age } = useController({
    control,
    name: 'age',
  });

  const { field: dateOfBirth } = useController({
    control,
    name: 'dateOfBirth',
  });

  const onNextStep = useCallback(async () => {
    const stepFormValues = {
      name: name.value,
      age: age.value,
      dateOfBirth: dateOfBirth.value,
    };
    try {
      clearErrors();
      await commonInfoSchema.validate(stepFormValues, { abortEarly: false });
      setStep(Steps.AdditionalInfo);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(({ path, message }) => {
          setError(path as keyof RegistrationData, {
            message,
          });
        });
      }
    }
  }, [name, age, dateOfBirth]);

  return (
    <Animated.View entering={FadeInUp}>
      <TextField
        {...name}
        label="Name *"
        placeholder="Enter Name"
        status={errors.name && 'error'}
        description={errors?.name?.message}
      />
      <Spacer height={20} />
      <TextField
        {...age}
        status={errors.age && 'error'}
        description={errors.age?.message}
        label="Age *"
        placeholder="Enter Age"
        keyboardType="numeric"
      />
      <Spacer height={20} />
      <Field label="Date of Birth *">
        {Platform.OS === 'ios' && (
          <DateTimePicker
            value={dateOfBirth.value}
            onChange={(_, date) => dateOfBirth.onChange(date)}
            mode="date"
            display="spinner"
            collapsable={true}
            style={{ flex: 1, height: 150 }}
            maximumDate={new Date()}
          />
        )}
        {Platform.OS === 'android' && (
          <Button
            title={new Date(dateOfBirth.value).toLocaleDateString()}
            type="secondary"
            onPress={() =>
              DateTimePickerAndroid.open({
                display: 'spinner',
                mode: 'date',
                value: dateOfBirth.value,
                onChange: (_, date) => dateOfBirth.onChange(date),
                collapsable: true,
                maximumDate: new Date(),
              })
            }
          />
        )}
      </Field>
      <Spacer height={20} />
      <Button title="Next" onPress={onNextStep} />
    </Animated.View>
  );
}
