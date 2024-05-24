import { ForwardedRef, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type FormSelectProps<T extends string> = {
  label?: string;
  id: T;
  placeholder?: string;
  error?: string;
  options: { key: string; value: string }[];
} & UseFormRegisterReturn<T>;

const FormSelect = <T extends string>(
  { label, id, placeholder, error, options, ...otherProp }: FormSelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement> | null
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
        <select
          {...otherProp}
          className={twMerge(
            'outline-none w-full h-full px-2 py-1',
            error && 'opacity-50'
          )}
          ref={ref}
          defaultValue="placeholder"
        >
          <option value="placeholder" disabled>
            {placeholder}
          </option>
          {options.map(({ key, value }) => (
            <option value={value} key={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-xs absolute bottom-0 left-2 text-red-600">{error}</p>
      )}
    </div>
  );
};

export default forwardRef<HTMLSelectElement, FormSelectProps<string>>(
  FormSelect
);
