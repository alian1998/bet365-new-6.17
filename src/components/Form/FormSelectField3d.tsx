import { Controller, useFormContext } from "react-hook-form";
import Select, { components } from "react-select";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

type TOption = {
  label: string;
  value: string;
  image?: string;
  phone?: string;
};

type TSelectProps = {
  name: string;
  className?: string;
  options: TOption[];
  placeholder?: string;
  required?: boolean;
  type?: string | undefined;
  onChange?: (value: string) => void;
  defaultValue?: number | null; // index-based default value
  readonly?: boolean | undefined; // Add readonly parameter
};

const FormSelectField3d = ({
  name,
  options,
  placeholder,
  onChange,
  defaultValue = 0,
  readonly = false, // Default to false
}: TSelectProps) => {
  const { control } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<TOption | null>(
    options && options.length > 0 && defaultValue !== null
      ? options[defaultValue]
      : null
  );


  // Custom option component
  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <div className="flex justify-between items-center gap-2 w-full ">
        {props.data.label && (
          <div className="flex   justify-between items-center gap-1 text-gray-50 w-full">
            {props.data.label}
            <div className="flex gap-2 place-items-center">
              <a
                href={`https://wa.me/${props?.data?.label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <BsWhatsapp className="text-xl" />
              </a>
            </div>
          </div>
        )}
      </div>
    </components.Option>
  );

  // Custom styles for react-select
  const customStyles = {
    control: (base: any,  ) => ({
      ...base,
      backgroundColor: "#005c30",
      border: "5px solid #007a40",
      borderRadius: "0.75rem",
      fontWeight: 600,
      fontSize: "1.25rem", // text-xl
      color: "white",
      minHeight: "45px",
      boxShadow:
        "4px 4px 4px #014c25, 0 6px 10px rgba(0,0,0,0.3), inset 0 4px 4px #004d28",
      // padding: "0.2rem 0.75rem",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "",
        borderColor: "",
        boxShadow:
          "4px 4px 4px #014c25, 0 6px 10px rgba(0,0,0,0.3), inset 0 4px 4px #004d28",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#00a359"
        : state.isFocused
          ? "#00924f"
          : "#005c30",
      color: state.isSelected || state.isFocused ? "white" : "white",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:active": {
        backgroundColor: "#007a40",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#004b26",
      borderRadius: "0.75rem",
      overflow: "hidden",
      marginTop: "6px",
      zIndex: 100,
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#dddd",
      opacity: 0.8,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#dddd",
      "&:hover": {
        color: "#00cc66",
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0px 8px",
    }),
  };


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedOption?.value || ""}
      render={({ field }) => (
        <div className="flex items-center justify-center py-1">
          <div className="w-full max-w-md relative">
           
            {/* Main select box */}
            <div className="relative ">
              <Select
                {...field}
                options={options}
                components={{ Option: CustomOption }}
                placeholder={placeholder}
                styles={customStyles}
                value={selectedOption}
                onChange={(option) => {
                  const selected = option as TOption;
                  setSelectedOption(selected);
                  field.onChange(selected?.value);
                  if (onChange) onChange(selected?.value);
                }}
                // isClearable={!required}
                isDisabled={readonly}
              />

              {/* Highlight line */}
              {/* <div className="absolute top-0 left-[3px] right-[3px] h-[1px] bg-[#014c25] opacity-50 rounded-full z-20" /> */}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default FormSelectField3d;
