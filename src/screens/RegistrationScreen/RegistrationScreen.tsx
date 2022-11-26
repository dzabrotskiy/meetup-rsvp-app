import { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LottieView from 'lottie-react-native';

import { ScreenContainer } from 'components/ScreenContainer';
import { register } from 'api/register';
import { Text, View } from 'components/Themed';
import { Spacer } from 'components/Spacer';

import { Steps } from './constants';
import { RegistrationData } from './types';
import { CommonInfo } from './CommonInfo';
import { AdditionalInfo } from './AdditionalInfo';
import { Address } from './Address';

const registrationDataSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup.number().integer().required('Age is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  profession: yup.string().required('Please select profession'),
  locality: yup.string().required('Locality is required'),
  numberOfGuests: yup
    .number()
    .integer()
    .min(0)
    .max(2)
    .required('Please select number of guests'),
  address: yup
    .string()
    .max(50, 'Length should be less or equal than 50')
    .required('Address is required'),
});

export function RegistrationScreen() {
  const [step, setStep] = useState<Steps>(Steps.CommonInfo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const form = useForm<RegistrationData>({
    resolver: yupResolver(registrationDataSchema),
    defaultValues: {
      profession: 'Employed',
      numberOfGuests: 0,
      dateOfBirth: new Date(),
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(async (registrationData: RegistrationData) => {
    try {
      setIsLoading(true);
      await register(registrationData);
      form.reset();
      setIsSuccess(true);
    } catch (err) {
      Alert.alert('Error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isSuccess) {
    return (
      <ScreenContainer>
        <View style={styles.successContainer}>
          <LottieView
            loop={false}
            autoPlay={true}
            style={styles.lottie}
            source={require('../../../assets/success.json')}
          />
          <Spacer height={2} />
          <Text style={styles.successTitle}>
            You have registered successfully!
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <LottieView
            autoPlay={true}
            style={styles.lottie}
            source={require('../../../assets/double-loader.json')}
          />
        </View>
      )}
      <FormProvider {...form}>
        {step === Steps.CommonInfo && <CommonInfo setStep={setStep} />}
        {step === Steps.AdditionalInfo && <AdditionalInfo setStep={setStep} />}
        {step === Steps.Address && (
          <Address setStep={setStep} onSubmit={form.handleSubmit(onSubmit)} />
        )}
      </FormProvider>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    position: 'absolute',
    zIndex: 2,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
  },
});
