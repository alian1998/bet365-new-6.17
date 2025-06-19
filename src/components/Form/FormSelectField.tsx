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

const FormSelectField = ({
  name,
  options,
  placeholder,
  required,
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
          <div className="flex justify-between items-center gap-1 text-gray-500 w-full">
            {props.data.label}
            <div className="flex gap-2 place-items-center">
              <a
                href={`https://wa.me/${props?.data?.label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <p>Contact us</p>
                <BsWhatsapp />
              </a>
            </div>
          </div>
        )}
      </div>
    </components.Option>
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent", // Make main box transparent
      color: "#fff", // Set text color to white
      border: "1px solid #ccc", // Optional: tweak border
      boxShadow: "none", // Optional: remove focus shadow
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff", // White selected text
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFB70A" : provided.backgroundColor,
      border: state.isSelected ? "2px solid #FFB70A" : "none",
      color: state.isSelected ? "#FFB70A" : provided.color,
    }),
    menu: (provided: any) => ({
      ...provided,
      marginBottom: "20px",
      paddingBottom: "50px",
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedOption?.value || ""} // store value in form state
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          components={{ Option: CustomOption }}
          placeholder={placeholder}
          styles={customStyles}
          value={selectedOption} // display the full option for the UI
          onChange={(option) => {
            const selectedOption = option as TOption;
            setSelectedOption(selectedOption);
            field.onChange(selectedOption?.value); // store only the value in form state
            if (onChange) onChange(selectedOption.value);
          }}
          isClearable={!required}
          isDisabled={readonly} // Set isDisabled based on readonly parameter
        />
      )}
    />
  );
};

export default FormSelectField;
