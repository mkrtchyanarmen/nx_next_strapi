import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type SubmitButtonProps = {
  disabled: boolean;
  loading: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ disabled, loading }) => {
  return (
    <button
      disabled={disabled || loading}
      className={twMerge(
        'w-full text-base rounded py-2 font-medium text-white',
        disabled
          ? 'bg-gray-500 cursor-not-allowed text-opacity-70'
          : 'bg-green-600 hover:bg-opacity-80',
        loading && 'bg-opacity-80'
      )}
    >
      {loading ? 'Loading...' : 'Register'}
    </button>
  );
};

export default SubmitButton;
