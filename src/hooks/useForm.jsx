"use client";
import React, { useState } from "react";

const useForm = ({ validation }) => {
  const [value, setValue] = useState("");

  const [isInputValidate, setIsInputValidate] = useState(false);

  const [isInputFocus, setIsInputFocus] = useState(false);

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
    if (validation.required) {
      if (e.target.value) {
        setIsInputValidate(true);
      } else {
        setIsInputValidate(false);
      }
    }
  };

  const inputFocusHandler = () => {
    setIsInputFocus(true);
  };

  return [
    value,
    isInputValidate,
    isInputFocus,
    inputChangeHandler,
    inputFocusHandler,
    validation,
    setIsInputFocus,
  ];
};

export default useForm;
