"use client";
import React, { useContext } from "react";
import DateRangeSelect from "@/component/shared/form/DateRangePicker";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const BookIssuseteacher = () => {
  const { teacherData, libraryrecord,bookIssue, setBookIssue } = useContext(UserContext);
const { handleSubmit, control } = useForm();
const id = uuidv4();
const onSubmit = (data) => {
  const issue = { ...data, id };
  const storedData = [...bookIssue, issue];
  setBookIssue(storedData);
};
  return (
    <>
      <Container>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>Book Issue By the Teacher</Typography>
            <div className="attendance">
              <FormInputSelect
                control={control}
                name="teachername"
                label="Teacher Name"
                options={teacherData?.map((item) => item?.name)}
              />
              <FormInputSelect
                control={control}
                className="ml-2"
                name="bookname"
                label="Book Name"
                options={libraryrecord?.map((item) => item?.bookname)}
              />
               <FormInputSelect
                control={control}
                name="bookno"
                label="Book No"
                className=" ml-2"
                options={libraryrecord?.map((item) => item?.bookno)}
              />
            </div>
            <div className="attendance">
              <FormInputSelect
                control={control}
                name="writer"
                label="writer"
                className="mt-4"
                options={libraryrecord?.map((item) => item?.writer)}
              />
              <DateRangeSelect
                control={control}
                name="issuedate"
                className="mt-4 ml-2"
                label="Issue Date"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              color="primary"
            >
              Add Record
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default BookIssuseteacher;
