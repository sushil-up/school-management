import * as Yup from "yup";
export const LeaveRequestValidation = Yup.object().shape({
  reason: Yup.string().required("Reason is required."),
  name: Yup.string().required("Name is required."),
});
