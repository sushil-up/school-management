import * as Yup from "yup";
export const LeaveRequestValidation = Yup.object().shape({
  leavedate: Yup.string().required(
    "Leave date is required. Kindly fill it in."
  ),

  reason: Yup.string().required("Reason is required. Kindly fill it in."),
});
