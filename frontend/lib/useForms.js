import { useEffect, useState } from "react";

function useForms(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(inputs);
  }, [initialValues]);
  function handleChange(e) {
    let { name, value, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      value = e.target.files[0];
    }
    setInputs({ ...inputs, [name]: value });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}

export default useForms;
