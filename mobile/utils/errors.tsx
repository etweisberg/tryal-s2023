import { MyObject } from "../components/types";

export const authErrors : MyObject = {
  'Email': ['Email required', 'Valid email required'],
  'Username': ['Username required'],
  'Password': ['Password required', 'Password must be at least 8 characters'],
  'Confirm Password': ['Confirm password required', 'Passwords must match'],
  'First Name': ['First name required'],
  'Last Name': ['Last name required'],
  'Sex': [],
  'Gender': [],
  'Age': [],
  'Race': [],
  'Ethnicity': [],
  'Scanned ID': ['Scanned ID required'],
  'Picture': ['Picture required'],
}

export const trialErrors: MyObject = {
  'Title': ['Title required'],
  'Description': ['Description required'],
  'Date': ['Date required'],
  'Compensation': ['Compensation required'],
  'Location': ['Location required'],
  'Additional Notes': [],
}