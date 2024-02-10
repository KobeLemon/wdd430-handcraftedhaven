'use client'

import React, { InputHTMLAttributes, FC, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    className?: string;

}

const ProfileInput: FC<InputProps> = ({ defaultValue='', className='', ...rest }) => {

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };

  return (
    <>
    <input type='text' value={value}
	onChange={handleChange}
	className={className}
	/>
    </>
  );
};
export default ProfileInput;