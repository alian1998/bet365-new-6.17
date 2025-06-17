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

const FormInputField3d = ({
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
  console.log(className);
  
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        
        <div className={`${type === "checkbox" ? "flex flex-col" : ""}`}>
          {title ? (
            // <p className="text-white1 text-[14px] mb-1 font-normal">
            //   {title}
            //   {name !== "referCode" && <span className="text-red-500">*</span>}
            // </p>
            ''
          ) : (
            ""
          )}
          <div className="flex items-center justify-center py-2">
            <div className="w-full max-w-md relative">
              {/* Bottom shadow layers for 3D effect */}
              {/* <div className="absolute inset-0 rounded-xl bg-[#014c25] translate-y-[4px] blur-[1px] opacity-80"></div> */}
              {/* <div className="absolute inset-0 rounded-xl bg-[#002a16] translate-y-[6px] blur-[2px] opacity-60"></div> */}

              {/* Main input with 3D border styling */}
              <div className="relative rounded-xl">
                <input
                   className="w-full  rounded-xl bg-[#005c30] text-white placeholder-white/50 text-xl py-1 px-3 font-semibold
    outline-none relative z-0
    border-[5px] border-[#007a40]
    shadow-[4px_4px_4px_#014c25,0_6px_10px_rgba(0,0,0,0.3),inset_0_4px_4px_#004d28]"

                  {...field}
                  type={type}
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

                {/* Top highlight for 3D effect */}
                {/* <div className="absolute top-0 left-[3px] right-[3px] h-[1px] bg-[#00a359] opacity-50 rounded-full z-20"></div> */}
              </div>
            </div>
          </div>


          {/* {error && type !== "checkbox" && (
            <span className="text-[#e82828] text-[14px]">{error.message}</span>
          )} */}
          
        </div>
        
      )}
    />
  );
};

export default FormInputField3d;
