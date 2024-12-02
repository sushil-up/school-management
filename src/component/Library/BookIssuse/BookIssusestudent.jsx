"use client";
import React, { useContext } from "react";
import UserContext from "@/context/UserContext";
import DateRangeSelect from "@/component/shared/form/DateRangePicker";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import { Button, Container, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const BookIssusestudent = () => {
  const { studentData, libraryrecord, bookIssue, setBookIssue } =
    useContext(UserContext);
  const { handleSubmit, control } = useForm();
  const id = uuidv4();
  const onSubmit = (data) => {
    const issue = { ...data, id };
    const storedData = [...bookIssue, issue];
    const studata = studentData.filter(
      (item) => item.name === data.studentname && item?.rollno === item?.rollno
    );
    console.log("data", studata);
    setBookIssue(storedData);
  };

  return (
    <>
      <Container>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>Book Issue By the Student</Typography>
            <div className="attendance">
              <FormInputSelect
                control={control}
                name="studentname"
                label="Student Name"
                options={studentData?.map((item) => item?.name)}
              />
              <FormInputSelect
                control={control}
                className="ml-2"
                name="rollno"
                label="Student rollno"
                options={studentData?.map((item) => item?.rollno)}
              />
            </div>
            <div className="attendance">
              <FormInputSelect
                className="mt-4"
                control={control}
                name="bookname"
                label="Book Name"
                options={libraryrecord?.map((item) => item?.bookname)}
              />
              <FormInputSelect
                control={control}
                name="bookno"
                label="Book No"
                className="mt-4 ml-2"
                options={libraryrecord?.map((item) => item?.bookno)}
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

export default BookIssusestudent;
