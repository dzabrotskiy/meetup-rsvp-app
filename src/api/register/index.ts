import { axiosInstance } from 'api/axios';
import { RegistrationData } from 'screens/RegistrationScreen';

export async function register(registrationData: RegistrationData) {
  const url = '/api/register';
  const { data } = await axiosInstance.post(url, registrationData);

  return data;
}
