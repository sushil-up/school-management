import * as Yup from "yup";

export const StudentValidation = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  gender:Yup.string().required("Gender is required"),
  mothername:Yup.string().required("Mother's name is required"),
  rollno:Yup.string().required("Roll No is required"),
  section:Yup.string().required("Section is required"),
  class:Yup.string().required("Class is required"),
  email:Yup.string().required("Email is required"),
  dob:Yup.string().required("DOB is required"),
  fathername:Yup.string().required("Father's name is required"),
  city:Yup.string().required("City is required"),
  country:Yup.string().required("Country is required"),
  state:Yup.string().required("State is required"),
  address:Yup.string().required("Address is required"),
  bloodgroup:Yup.string().required("Blood Group is required"),
  religion:Yup.string().required("Religion is required"),
  admissionno:Yup.string().required("Admission no is required"),
  admissiondate:Yup.string().required("Admission date is required"),
});