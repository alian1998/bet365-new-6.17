import { Controller } from "react-hook-form";
import Select from "react-select";

export type IOptions = {
  label: string;
  value: string;
};
type selectType = {
  name: string;
  control: any;
  label: string;
  defaultValue: number | string;
  placeholder: string;
  options: IOptions | any;
};

const SelectOptions = ({
  name,
  control,
  label,
  options,
  defaultValue,
  placeholder = "Select...",
}: selectType) => {
  // let currentColor: string;

  // const customStyles = {
  //   control: (baseStyles: any, state: any) => ({
  //     ...baseStyles,
  //     borderColor: state.isFocused ? "#3cb7ed" : "#fff",
  //     borderRadius: "10px",
  //     height: "full",
  //     padding: "5px",
  //     backgroundColor: "transparent",
  //     color: currentColor,
  //   }),
  //   option: (provided: any, state: any) => ({
  //     ...provided,
  //     backgroundColor: state.isSelected ? "#3cb7ed" : "#fff",
  //     color: state.isSelected ? "#fff" : "#fff",
  //     "&:hover": {
  //       backgroundColor: "#fff",
  //       color: "white",
  //     },
  //   }),
  // };

  return (
    <div>
      <label className="mt-2 mb-1 block   text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={options[defaultValue]}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                // neutral80: `{${currentColor}}`,
              },
            })}
          />
        )}
      />
    </div>
  );
};

export default SelectOptions;

// set default value
// defaultValue={options.find(option => option.value === defaultValue)}
