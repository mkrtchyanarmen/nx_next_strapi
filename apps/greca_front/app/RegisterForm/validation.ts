import * as yup from 'yup';
import { AgeGroupEnum } from './utils';

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be minimum 2 characters')
    .max(32, 'First name must be maximum 32 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Not valid email address'),
  ageGroup: yup
    .mixed()
    .required('Age group is required')
    .oneOf(Object.values(AgeGroupEnum), 'Age group can not be empty'),

  address: yup.string(),
});
