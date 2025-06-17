import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffect } from "react";

type TFormConfig = {
  resolver?: Resolver | undefined;
  defaultValues?: FieldValues;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onChange?: (data: FieldValues) => void;
} & TFormConfig;

const Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  onChange,
}: TFormProps) => {
  const formConfig: TFormConfig = { resolver, defaultValues };
  // console.log(defaultValues);
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  const { handleSubmit, watch, setValue } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // reset()
  };

  useEffect(() => {
    const subscription = watch((data) => {
      if (data.fieldA === "specificValue") {
        setValue("fieldB", "newValue");
      }
      if (onChange) {
        onChange(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, onChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
