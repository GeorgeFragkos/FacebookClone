import * as Yup from "yup";
const registerDataValidation = Yup.object({
  first_name: Yup.string()
    .required("What's your first name")
    .min(2, "First name must between 2 and 16 characters")
    .max(16, "First name must between 2 and 16 characters")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
  last_name: Yup.string()
    .required("What's your Surname")
    .min(2, "Surname  must between 2 and 16 characters")
    .max(16, "Surname must between 2 and 16 characters")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
  email: Yup.string().required().email("Enter a valid email address"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

export default registerDataValidation;
