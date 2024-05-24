import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type FormInputProps<T extends string> = {
  label?: string;
  id: T;
  placeholder?: string;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
} & UseFormRegisterReturn<T>;

const FormInput = <T extends string>(
  {
    label,
    id,
    placeholder,
    error,
    type = 'text',
    ...otherProp
  }: FormInputProps<T>,
  ref: ForwardedRef<HTMLInputElement> | null
) => {
  return (
    <div className="flex flex-col relative">
      {label && (
        <label htmlFor={id} className="text-sm mb-1 text-gray-400">
          {label}
        </label>
      )}
      <div
        className={twMerge(
          'border rounded mb-5',
          error ? 'border-red-600' : 'border-gray-400'
        )}
      >
        <input
          id={id}
          type="text"
          {...otherProp}
          ref={ref}
          placeholder={placeholder}
          className="outline-none bg-transparent px-2 py-1 w-full"
        />
      </div>
      {error && (
        <p className="text-xs absolute bottom-0 left-2 text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default forwardRef<HTMLInputElement, FormInputProps<string>>(FormInput);
