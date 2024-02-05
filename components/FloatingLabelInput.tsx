import React from "react";

interface FloatingLabelInputProps {
  type?: string;
  id: string;
  label: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // for additional input props
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  type = "text",
  id,
  label,
  placeholder = " ",
  error = false,
  errorMessage = "",
  className = "",
  value,
  onChange,
  ...inputProps
}) => {
  return (
    <div className={`relative z-0 ${className}`}>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        aria-describedby={`${id}_help`}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 peer ${
          error
            ? "border-red-600 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
            : "border-gray-300 focus:border-blue-600 dark:border-gray-300"
        }`}
        placeholder={placeholder}
        {...inputProps}
      />
      <label
        htmlFor={id}
        className="absolute text-sm duration-300  transform -translate-y-6 scale-75 top-3 -z-10 text-gray-500 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {error && (
        <p
          id={`${id}_help`}
          className="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span className="font-medium">Oh, snap!</span> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FloatingLabelInput;
