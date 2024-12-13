import * as Yup from "yup";
export const LibraryValidation = Yup.object().shape({
    bookname:Yup.string().required("Bookname is required."),
    bookno:Yup.string().required("Book No is Required"),
    class:Yup.string().required("Class is Required"),
    title:Yup.string().required("Title is Required"),
    subject:Yup.string().required("Subject is Required"),
    writer:Yup.string().required("Writer is Required"),
});