import * as Yup from "yup";
export const TimeTableValidation = Yup.object().shape({
  class: Yup.string().required("Class field is required. Kindly fill it in."),
  section: Yup.string().required(
    "Section field is required. Kindly fill it in."
  ),
  subject: Yup.string().required(
    "Subject field is required. Kindly fill it in."
  ),
  start_time: Yup.string().required(
    "Class start time field is required. Kindly fill it in."
  ),
  end_time: Yup.string().required(
    "Class end time field is required. Kindly fill it in."
  ),
  day: Yup.array()
    .of(Yup.string())
    .min(1, "At least one day must be selected.")
    .required("Day field is required. Kindly fill it in."),

  classno: Yup.string().required(
    "Room number field is required. Kindly fill it in."
  ),
  teacher: Yup.string().required(
    "Teacher is required. Please provide the teacher's name."
  ),
});
