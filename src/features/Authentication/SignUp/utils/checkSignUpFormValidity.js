export const checkSignUpFormValidity = ({ formData, setError }) => {
  let error = true;

  if (formData.fname === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(formData.fname)) {
    setError((error) => ({ ...error, fnameError: "Enter valid Firsname" }));
    error = false;
  }
  if (formData.lname === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(formData.lname)) {
    setError((error) => ({ ...error, lnameError: "Enter valid Lastname" }));
    error = false;
  }
  if (formData.email === "" || !/^.+@.+\.com$/.test(formData.email)) {
    setError((error) => ({ ...error, emailError: "Enter a valid Email" }));
    error = false;
  }
  if (
    formData.username === "" ||
    !/^[a-zA-Z]+(\s*\w*)*$/.test(formData.username)
  ) {
    setError((error) => ({ ...error, userNameError: "Enter valid Username" }));
    error = false;
  }
  if (
    formData.password === "" ||
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
      formData.password
    )
  ) {
    setError((error) => ({
      ...error,
      passwordError:
        "Password must contain minimum 8 characters (at least one capital, small letter and number)",
    }));
    error = false;
  }
  return error;
};
