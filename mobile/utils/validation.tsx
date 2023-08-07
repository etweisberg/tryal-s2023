import * as yup from 'yup';

export const registerSchemas = [
  yup.object().shape({
    'Email': yup.string().email("Valid email required").required("Email required")
  }),
  yup.object().shape({
    'Username': yup.string().required('Username required'),
    'Password': yup.string().required('Password required').min(8, 'Password must be at least 8 characters'),
    'Confirm Password': yup.string().required('Confirm password required').oneOf([yup.ref('Password'), ''], 'Passwords must match'),
  }),
  yup.object().shape({
    'First Name': yup.string().required('First name required'),
    'Last Name': yup.string().required('Last name required'),
  }),
  yup.object().shape({
    'Sex': yup.string().required('Sex required'),
    'Age': yup.number().required('Age required'),
  }),
  yup.object().shape({
    'Race': yup.string(),
    'Ethnicity': yup.string(),
  }),
]

export const researchRequestSchemas = [
  yup.object().shape({
    'First Name': yup.string().required('First name required'),
    'Last Name': yup.string().required('Last name required'),
  }),
  yup.object().shape({
    'Email': yup.string().email("Valid email required").required("Email required"),
    'Institution': yup.string().required('Institution required'),
  }),
  yup.object().shape({
    'Scanned ID': yup.string().required('Scanned ID required'),
  }),
  yup.object().shape({
    'Picture': yup.string().required('Picture required'),
  }),
]

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Valid email required"),
  password: yup.string().required("Password required"),
});