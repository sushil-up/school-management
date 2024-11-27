import * as Yup from "yup";
export const TeacherValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  qualification: Yup.string().required("Qualification is required"),
  address: Yup.string().required("Address is required"),
  designation: Yup.string().required("Designation is required"),
  section: Yup.string().required("Section is required"),
  class: Yup.string().required("Class is required"),
  email: Yup.string().required("Email is required"),
  dob: Yup.string().required("DOB is required"),
  joiningdate: Yup.string().required("Joining Date is required"),
  salary: Yup.number().required("Salary is required"),
});
