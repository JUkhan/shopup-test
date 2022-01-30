import React, { useEffect } from 'react';
interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const formInput = React.forwardRef<any, InputProps>((props, ref) => {
  const { name } = props;

  return (
    <label>
      {name[0].toUpperCase() + name.slice(1)}:
      <input
        ref={ref}
        {...props}
      />
    </label>

  );
});
export default formInput; 