import { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  maxlength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  readOnly?: boolean | undefined;
  disabled?: boolean;
  props?: any;
};

const FormInputField = ({
  name,
  type,
  className,
  placeholder,
  defaultValue,
  required,
  maxlength,
  title,
  onChange,
  readOnly,
  disabled,
  props,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${type === "checkbox" ? "flex flex-col" : ""}`}>
          {title ? (
            <p className="text-gray-100 font-semibold text-[14px] mb-1">
              {title}
              {name !== "referCode" && <span className="text-red-500">*</span>}
            </p>
          ) : (
            ""
          )}
          <input
            {...field}
            type={type}
            className={`w-full bg-black px-2 border-2 border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-2  text-white1 ${className}`}
            placeholder={placeholder}
            required={required}
            maxLength={maxlength}
            readOnly={readOnly}
            disabled={disabled}
            onKeyDown={(e) => {
              if (type === "number") {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            {...props}
          />
          {error && type !== "checkbox" && (
            <span className="text-[#e82828] text-[14px]">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default FormInputField;
