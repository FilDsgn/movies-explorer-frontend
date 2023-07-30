import { useState, useCallback, useRef, useEffect } from "react";

function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [values]);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage }));
  };

  const reset = (initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
  };

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  }, []);

  const handleSetIsValid = (boolean) => {
    setIsValid(boolean);
  };

  return {
    values,
    errors,
    isValid,
    handleSetIsValid,
    setIsValid,
    handleChange,
    setValue,
    reset,
    formRef,
  };
}

export default useFormValidation;
