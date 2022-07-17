import * as Yup from "yup";

const loginDataValidation = Yup.object({
  email: Yup.string()
    .required("Email address is required")
    .email("Must be a valid email")
    .max(100),
  password: Yup.string().required("Password is required"),
});
export default loginDataValidation;
