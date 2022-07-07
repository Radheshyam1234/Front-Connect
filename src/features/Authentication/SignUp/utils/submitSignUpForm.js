import { checkSignUpFormValidity } from "./checkSignUpFormValidity";
import { signupUser } from "../../AuthenticationSlice";

export const submitSignUpForm = ({ formData, setError, dispatch }) => {
  setError({
    fnameError: "",
    lnameError: "",
    emailError: "",
    userNameError: "",
    passwordError: "",
  });

  if (checkSignUpFormValidity({ formData, setError })) {
    const signUpDetails = {
      firstName: formData.fname,
      lastName: formData.lname,
      userName: formData.username,
      email: formData.email,
      password: formData.password,
    };

    dispatch(signupUser(signUpDetails));
  }
};
