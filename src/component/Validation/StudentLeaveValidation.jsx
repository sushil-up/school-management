import * as Yup from "yup";

export const StudentLeaveValidation = Yup.object().shape({
  section: Yup.string().required("Section is required"),
  rollno: Yup.string().required("Rollno is required"),
  reason: Yup.string().required("Reason is required"),
  class: Yup.string().required("Class is required"),
});
