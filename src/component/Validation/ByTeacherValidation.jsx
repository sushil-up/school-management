import * as Yup from "yup";
export const ByTeacherValidation = Yup.object().shape({
    book:Yup.string().required("Book is required."),
    bookno:Yup.string().required("Book No is Required"),
    name:Yup.string().required("Name is Required"),
    writer:Yup.string().required("Writer is Required"),
});