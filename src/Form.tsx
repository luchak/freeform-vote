import React, { useState } from "react";

interface FormInputProps {
  label: string;
  order: number;
  defaultValue?: string;
}

interface FormInputs {
  [name: string]: FormInputProps;
}

export const Form = <T extends FormInputs>(props: {
  onSubmit: (values: {[name in keyof T]: string}) => void;
  inputs: T;
}) => {
  const { inputs, onSubmit } = props;
  const [ values, setValues ] = useState<{[key in keyof T]: string}>(
      () =>
      Object.assign({}, 
        ...Object.entries(inputs).map(([name, input]) => ({[name as keyof T]: input.defaultValue || ''}))
        )
  );

  const keyOrder = Object.keys(inputs).sort(
    (a, b) => inputs[a].order - inputs[b].order
  );

  return (
    <form onSubmit={event => {
        onSubmit(values);
        event.preventDefault();
        }}>
      <div>
        {keyOrder.map(key => (
          <FormInput
            key={key}
            name={key}
            value={values[key]}
            setValue={value => setValues(values => Object.assign({}, values, {[key]: value}))}
            {...inputs[key]}
          />
        ))}
        <input type="submit" />
      </div>
    </form>
  );
};

const FormInput = (
  props: {
    name: string;
    value: string;
    setValue: (value: string) => void;
  } & FormInputProps
) => {
  const { name, label, value, setValue } = props;
  return (
    <div>
      <label>{label}</label>:{" "}
      <input
        type="text"
        name={name}
        value={value}
        size={10}
        onChange={event => {
            setValue(event.target.value);
            event.preventDefault();
        }}
      />
    </div>
  );
};
