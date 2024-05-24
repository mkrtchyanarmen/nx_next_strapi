'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import FormInput from '../../components/FormInput';
import SubmitButton from '../../components/SubmitButton';
import { useMutation, DefaultError } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AgeGroupEnum } from './utils';
import FormSelect from '../../components/FormSelect';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation<unknown, DefaultError, Record<string, unknown>>({
    mutationFn: (newUser) => {
      return axios.post('/api/user', newUser);
    },
    onSettled: () => {
      reset();
      toast.success('The user is registered');
    },
  });

  return (
    <div className="max-w-lg w-full bg-white rounded-md px-4 py-6 shadow-lg">
      <h4 className="text-lg font-semibold mb-3">Register user</h4>

      <form
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data);
        })}
        className="flex flex-col gap-1"
      >
        <FormInput
          id="firstName"
          {...register('firstName')}
          label="* First name"
          placeholder="Insert your name here"
          error={errors.firstName}
        />
        <FormInput
          id="email"
          {...register('email')}
          label="* Email"
          placeholder="Insert your email here"
          error={errors.email}
        />
        <FormSelect
          id="ageGroup"
          {...register('ageGroup')}
          label="Address"
          placeholder="Select your age group"
          options={Object.entries(AgeGroupEnum).map(([key, value]) => ({
            key,
            value,
          }))}
          error={errors.ageGroup?.message}
        />
        <FormInput
          id="address"
          {...register('address')}
          label="Address"
          placeholder="Insert your address here"
          error={errors.address}
        />
        {mutation.isError && (
          <p className="text-base text-red-500">{mutation.error.message}</p>
        )}
        <SubmitButton
          disabled={isSubmitted && (!isValid || !isSubmitted)}
          loading={mutation.isPending}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
