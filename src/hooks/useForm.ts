import React, {ChangeEventHandler, useState} from "react";

export type TProfileInfoForm = {
  name: string;
  email: string;
  password: string;
}

export function useForm<T>(inputValues:T):{
  values: T,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  setValues: React.Dispatch<React.SetStateAction<T>>
} {
  const [values, setValues] = useState(inputValues);

  const handleChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
