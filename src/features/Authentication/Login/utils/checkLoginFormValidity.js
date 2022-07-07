export const checkLoginFormValidity = ({ formData, setFormData }) => {
  setFormData((formData) => ({
    ...formData,
    emailError: "",
    passwordError: "",
  }));

  let error = true;
  if (formData.email === "" || !/^.+@.+\.com$/.test(formData.email)) {
    setFormData((formData) => ({
      ...formData,
      emailError: "Please enter a valid Email",
    }));
    error = false;
  }
  if (formData.password === "") {
    setFormData((formData) => ({
      ...formData,
      passwordError: "Please enter password",
    }));
    error = false;
  }

  return error;
};
