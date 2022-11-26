import { Steps } from './constants';

export type RegistrationData = {
  name: string;
  age: string;
  dateOfBirth: Date;
  profession: 'Employed' | 'Student';
  locality: string;
  numberOfGuests: 0 | 1 | 2;
  address: string;
};

export type StepFormProps = {
  setStep(step: Steps): void;
  onSubmit?: () => void;
};
